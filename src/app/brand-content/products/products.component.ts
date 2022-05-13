import { ActivatedRoute, Router } from '@angular/router';
import { IMainCategory, IProduct, ProductService, ISubCategory } from '../../services/product.service';
import { BrandComponent } from '../brand.component';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from "@angular/material";

@Component({
    selector: 'products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {
    mainCategories: Array<IMainCategory> = []
    subCategories: Array<ISubCategory> = []
    products: Array<IProduct> = []
    disableSelects: boolean = true
    selectedSubId: number
    selectedMainId: number
    showMain: boolean = true
    showSub: boolean = false
    showProduct: boolean = false
    brandId: number

    constructor(
        private brand: BrandComponent,
        private productService: ProductService,
        private snack: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.brandId = this.brand.brandId
        this.productService.getMainCategories(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(
            r => {
                this.mainCategories = r
                this.route.params.subscribe(params => {
                    if (+params['mainId']) {
                        this.getSelectData(+params['mainId'])
                        this.selectedMainId = +params['mainId']
                    }
                    // if (+params['subId']) {
                    //     this.getProducts(+params['subId'])
                    //     this.selectedSubId = +params['subId']
                    // }
                })
            })
    }

    setMainCategory(mainCategoryId: number) {
        this.router.navigate([this.brand.brand, this.brand.brandId, 'products', mainCategoryId])
    }

    // setSubCategory(subCategoryId: number) {
    //     this.router.navigate([this.brand.brand, this.brand.brandId, 'products', this.selectedMainId, subCategoryId])
    // }

    getSelectData(mainCategoryId: number) {
        this.disableSelects = false
        this.productService.getSubCategoriesForMainCategory(this.brand.brandId, mainCategoryId)
            .do(r => console.log(r))
            .subscribe(r => this.subCategories = r)

        this.productService.getProductsForMainCategory(this.brand.brandId, mainCategoryId)
            //.do(r => console.log(r))
            .subscribe(r => this.products = r)
    }

    getProducts(sub) {
        this.productService.getProductsForSubCategory(this.brand.brandId, sub)
            .do(r => console.log(r))
            .subscribe(r => this.products = r)
    }

    snackMe(message: string, action: string) {
        this.snack.open(message, action, {
            duration: 4000,
        })
    }

    view(type: string) {
        switch (type) {
            case 'main':
                this.showMain = true
                this.showSub = false
                this.showProduct = false
                break;
            case 'sub':
                this.showMain = false
                this.showSub = true
                this.showProduct = false
                break;
            case 'prod':
                this.showMain = false
                this.showSub = false
                this.showProduct = true
                break;
        }
    }
}