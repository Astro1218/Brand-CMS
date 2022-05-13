import { IProduct, ProductService } from '../../../services/product.service'
import { Component, OnInit, Input } from '@angular/core'
import { ProductDialogComponent } from './prod-dialog.component'
import { MdDialog, MdSnackBar } from '@angular/material'
import { PromoVideoDialogComponent } from './promo-dialog.component'

@Component({
    selector: 'list-prod',
    templateUrl: './list-prod.component.html'
})

export class ListProductComponent implements OnInit {
    columns: Array<string> = ['', 'Product SKU', 'Model Name', 'Primary', 'Secondary', 'PBX Active', 'CMS Active Override', 'Has Image', 'Region Code', '', '', '']

    @Input('array') products: Array<IProduct> = []

    constructor(
        private dialog: MdDialog,
        private snack: MdSnackBar,
        private productService: ProductService
    ) { }

    ngOnInit() { }

    edit(model): void {
        let dialogRef = this.dialog.open(ProductDialogComponent, {
            data: model,
            backdropClass: 'dialog-bg',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result)

            if (result) {
                console.log(result)
                this.update(result)
            }
        })
    }

    promo(model): void {
        let dialogRef = this.dialog.open(PromoVideoDialogComponent, {
            data: model,
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (!result)
                return false
            console.log('The dialog was closed', result)
        })
    }

    onDrop(index, model: IProduct) {
        if (index !== model.cmsOrder) {
            var reordered = []
            this.products.forEach((o: IProduct, i: number) => {
                reordered.push({
                    productId: o.productId,
                    cmsOrder: i
                })
            })

            this.productService.sortProduct(reordered)
                .do(r => console.log('sortMainCategory', r))
                .subscribe(r => this.snackMe('Sorted!', ''))
        }
    }

    snackMe(message: string, action: string) {
        this.snack.open(message, action, {
            duration: 4000,
        })
    }

    switchActive(model) {
        model.cmsActiveOverride = !model.cmsActiveOverride
        this.update(model)
    }

    switchFeature(model) {
        model.featuredProductActive = !model.featuredProductActive
        this.update(model)
    }

    update(result) {
        this.productService.updateProduct(result.productId, result)
            .do(r => console.log(r))
            .subscribe(r => {
                var row = this.products.find(x => x.productId === result.productId)
                row.cmsActiveOverride = result.cmsActiveOverride
                row.featuredProductActive = result.featuredProductActive

                if (result.cmsActiveOverride !== null) {
                    row.cmsActive = result.cmsActiveOverride
                }

                this.snackMe('Request completed', '')
            })
    }
}
