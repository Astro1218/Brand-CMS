import { Component, OnInit } from '@angular/core';
import { IProductMagazineReview, MagazineReviewsService } from '../../services/magazine-reviews.service';
import { BrandComponent } from '../brand.component';
import { PMRDialogComponent } from './pmr-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
    selector: 'pmr',
    templateUrl: './pmr.component.html'
})

export class PMRComponent implements OnInit {
    list: Array<IProductMagazineReview> = []

    constructor(
        private pmrService: MagazineReviewsService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get() {
        this.pmrService.get(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.list = r)
    }

    remove(model) {
        if (confirm('Deleting this will not remove image gallery items, just the Product SKU for this Magazine Review and containing Review Items. Are you sure you want to continue to remove?')) {
            console.log(model)

            this.pmrService.delete(model.productMagazineReviewId)
                .subscribe(r => {
                    this.get()
                    this.snackBar.open('Magazine Review Deleted', '', { duration: 3000 })
                })
        }
    }

    openDialog(model: IProductMagazineReview, isNew: boolean) {
        const dialogRef = this.dialog.open(PMRDialogComponent, {
            data: { data: model, isNew: isNew, brandId: this.brand.brandId },
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: IProductMagazineReview) => {
                if (result) {
                    Object.assign(result, {});
                    result.brandId = this.brand.brandId

                    console.log(result)
                    this.pmrService.post(result)
                        .subscribe(r => {
                            this.get()
                            this.snackBar.open('Magazine Review Updated', '', { duration: 3000 })
                        })
                }
            })
    }
}