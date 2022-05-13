import { IFeatureProduct } from '../../services/admin.service';
import { BrandComponent } from '../brand.component';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'featured-product',
    templateUrl: './featured.component.html'
})

export class FeaturedComponent implements OnInit {
    columns: Array<string> = ['Product SKU', 'Featured Product Display Level', 'CMS Order']
    features: Array<IFeatureProduct> = []
    loading: boolean = true

    constructor(
        private productService: ProductService,
        private brand: BrandComponent
    ) { }

    ngOnInit() {
        this.productService.getFeaturedProducts(this.brand.brandId)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.features = r
                this.loading = false
            })
    }
}