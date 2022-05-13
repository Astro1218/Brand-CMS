import { Component, OnInit } from '@angular/core';
import { ProductGuideService, IProductGuide } from '../../services/product-guide.service';
import { BrandComponent } from '../brand.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { GuideDialogComponent } from './guide-dialog.component';

@Component({
    selector: 'product-guide',
    templateUrl: 'product-guide.component.html'
})

export class ProductGuideComponent implements OnInit {
    list: Array<IProductGuide> = []

    constructor(
        private guide: ProductGuideService, 
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() { 
        this.get()
    }

    get(){
        this.guide.get(this.brand.brandId)
        .do(r => console.log(r))
        .subscribe(r => this.list = r)
    }

    remove(model) {
        if (confirm('Deleting this will not remove image gallery items, just the Product SKU for this Product Guide and containing Guide Items. Are you sure you want to continue to remove?')) {
            console.log(model)

            this.guide.delete(model.mainCatGuideId)
                .subscribe(r => {
                    this.get()
                    this.snackBar.open('Category Guide Deleted', '', { duration: 3000 })
                })
        }
    }

    openDialog(model: IProductGuide, isNew: boolean) {
        const dialogRef = this.dialog.open(GuideDialogComponent, {
            data: { data: model, isNew: isNew, brandId: this.brand.brandId },
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: IProductGuide) => {
                if (result) {
                    result.brandId = this.brand.brandId
                    console.log(result)
                    this.guide.post(result)
                        .subscribe(r => {
                            this.get()
                            this.snackBar.open('Category Guide Updated', '', { duration: 3000 })
                        })
                }
            })
    }
}