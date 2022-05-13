import { DashboardService, IDashboard, ISearch } from '../../services/dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav, MdSnackBar, MdDialog } from "@angular/material";
import { BrandComponent } from "../brand.component";
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductDialogComponent } from '../products/product/prod-dialog.component';
import { ProductService } from '../../services/product.service';
import { IFeatureProduct } from '../../services/admin.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    dash: IDashboard
    form: FormGroup
    list: Array<ISearch> = []

    columns: Array<string> = ['Featured Product SKU']
    features: Array<IFeatureProduct> = []
    loading: boolean = true

    selectedSku

    constructor(
        private brand: BrandComponent,
        private dashboardService: DashboardService,
        private productService: ProductService,
        private snackBar: MdSnackBar,
        private fb: FormBuilder,
        private dialog: MdDialog,
        private snackMe: MdSnackBar
    ) { }

    ngOnInit() {
      alert()
        this.form = this.fb.group({
            searchString: ['']
        })
        this.dashboardService.get(this.brand.brandId)
            .subscribe(r => this.dash = r)

        this.get()
    }

    get() {
        this.productService.getFeaturedProducts(this.brand.brandId)
            .subscribe(r => {
                this.features = r
                this.loading = false
            })
    }

    search(searchString) {
        this.dashboardService
            .search(this.brand.brandId, searchString)
            .subscribe(r => {
                this.list = r
                this.selectedSku = searchString
            })
    }

    edit(model): void {
        let dialogRef = this.dialog.open(ProductDialogComponent, {
            data: model,
            backdropClass: 'dialog-bg',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.productService.updateProduct(result.productId, result)
                    .subscribe(r => {
                        var row = this.list.find(x => x.productId === result.productId)
                        row.cmsActiveOverride = result.cmsActiveOverride
                        row.featuredProductActive = result.featuredProductActive

                        if (result.cmsActiveOverride !== null) {
                            row.cmsActive = result.cmsActiveOverride
                        }
                        this.get()

                            this.snackMe.open('Request completed', '', { duration: 3000 })
                    })
            }
        })
    }
}
