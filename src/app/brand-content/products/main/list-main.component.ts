import { MainDialogComponent } from './main-dialog.component';
import { forEach } from '@angular/router/src/utils/collection';
import { IMainCategory, ProductService } from '../../../services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar, MdDialog } from "@angular/material";

@Component({
    selector: 'list-main',
    templateUrl: './list-main.component.html'
})

export class ListMainComponent implements OnInit {
    columns: Array<string> = ['', '','Main Category', 'PBX Active', 'CMS Active Override', 'Order']
    bag: string = ''
    @Input('array') mainCategories: Array<IMainCategory> = []
    @Input() brandId: number

    constructor(
        private productService: ProductService,
        private snack: MdSnackBar,
        private dialog: MdDialog
    ) { }

    ngOnInit() { }

    onDrop(index, model: IMainCategory) {
        if (index !== model.cmsOrder) {
            var reordered = []
            this.mainCategories.forEach((o: IMainCategory, i: number) => {
                reordered.push({
                    mainCategoryId: o.mainCategoryId,
                    cmsOrder: i
                })
            })

            this.productService.sortMainCategory(this.brandId, reordered)
                .do(r => console.log('sortMainCategory', r))
                .subscribe(r => this.snackMe('Sorted!', ''))
        }
    }

    edit(model) {
        const dialogRef = this.dialog.open(MainDialogComponent, {
            data: { data: model, isTriton: this.brandId === 1 },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe((result: IMainCategory) => {
                if (result) {
                    this.productService.updateMainCategory(this.brandId, result)
                        .subscribe(r => {
                            let main = this.mainCategories.find(m => m.mainCategoryId === result.mainCategoryId)
                            main.cmsActiveOverride = result.cmsActiveOverride
                            
                            if(result.cmsActiveOverride !== null){
                                main.cmsActive = result.cmsActiveOverride
                            }

                            this.snackMe('Updated', '')
                        }, e => this.snackMe(e.error.Type, ''))
                }
            })
    }

    snackMe(message: string, action: string) {
        this.snack.open(message, action, {
            duration: 4000,
        })
    }
}
