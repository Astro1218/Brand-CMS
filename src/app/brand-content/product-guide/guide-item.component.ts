import { Component, OnInit } from '@angular/core';
import { ProductGuideService, IProductGuide, IProductGuideItem } from '../../services/product-guide.service';
import { BrandComponent } from '../brand.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GuideItemDialogComponent } from './item-dialog.component';

@Component({
    selector: 'guide-item',
    templateUrl: 'guide-item.component.html'
})

export class ProductGuideItemComponent implements OnInit {
    list: Array<IProductGuideItem> = []
    guideId: number

    constructor(
        private guide: ProductGuideService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.guideId = +params['guideId']
            this.get(this.guideId)
        })
    }

    get(guideId) {

        this.guide.getItem(guideId)
            .do(r => console.log(r))
            .subscribe(r => this.list = r)
    }

    openDialog(model: IProductGuideItem) {
        const dialogRef = this.dialog.open(GuideItemDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: IProductGuideItem) => {
                if (result) {
                    Object.assign(result, { mainCatGuideId: this.guideId })
                    if (!result.cmsActive)
                        result.cmsActive = false

                    console.log(result)
                    this.guide.postItem(result)
                        .subscribe(r => {
                            this.get(this.guideId)
                            this.snackBar.open('Category Guide Item Updated', '', { duration: 3000 })
                        })
                }
            })
    }
}