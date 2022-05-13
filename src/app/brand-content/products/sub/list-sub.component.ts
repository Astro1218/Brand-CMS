import { ISubCategory, ProductService } from '../../../services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from "@angular/material";
import { SubDialogComponent } from "./sub-dialog.component";

@Component({
    selector: 'list-sub',
    templateUrl: './list-sub.component.html'
})

export class ListSubComponent implements OnInit {
    columns: Array<string> = ['', 'Sub Category', 'PBX Active', 'CMS Active Override', 'Image Uploaded', 'Order']

    @Input('array') subCategories: Array<ISubCategory> = []
    @Input() brandId: number

    constructor(
        private productService: ProductService,
        private snack: MdSnackBar,
        private dialog: MdDialog
    ) { }

    ngOnInit() {
        if (this.brandId !== 3)
            this.columns = ['', 'Sub Category', 'PBX Active', 'CMS Active Override', 'Order']
    }

    onDrop(index, model: ISubCategory) {
        if (index !== model.cmsOrder) {
            var reordered = []
            this.subCategories.forEach((o: ISubCategory, i: number) => {
                reordered.push({
                    subCategoryId: o.subCategoryId,
                    cmsOrder: i
                })
            })

            this.productService.sortSubCategory(this.brandId, reordered)
                .do(r => console.log('sortSubCategory', r))
                .subscribe(r => this.snackMe('Sorted!!', ''))
        }
    }

    edit(model) {
        const dialogRef = this.dialog.open(SubDialogComponent, {
            data: model,
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe((result: ISubCategory) => {
                if (result) {
                    console.log(result)
                    this.productService.updateSubCategory(this.brandId, result)
                        .subscribe(r => {
                            var sub = this.subCategories.find(m => m.subCategoryId === result.subCategoryId)
                            sub.cmsActiveOverride = result.cmsActiveOverride

                            if (result.cmsActiveOverride !== null) {
                                sub.cmsActive = result.cmsActiveOverride
                            }

                            this.snackMe('Request completed', '')
                        })
                }
            })
    }

    snackMe(message: string, action: string) {
        this.snack.open(message, action, {
            duration: 4000,
        })
    }
}
