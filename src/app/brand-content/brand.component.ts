import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { CommonService } from '../services/common.service'
import { AppComponent } from '../app.component'

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'brand',
    template: `
    
    <router-outlet></router-outlet>
    `
})

export class BrandComponent implements OnInit {
    brand: string
    brandId: number

    constructor(
        private app: AppComponent,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private adminService: AdminService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.brand = params['brand']
            this.app.selectedBrand = params['brand']
            this.brandId = +params['brandId']

            var brandId = +params['brandId']

            this.authService.authUser(brandId).subscribe(r => {
                if (!r) {
                    this.router.navigate(['401'])
                    return false
                } else {
                    this.commonService.getNavigation(brandId)
                        .subscribe(r => this.app.setBrandCategories(r, brandId))

                    this.adminService.getBrandById(this.brandId)
                        .subscribe(r => {
                            this.app.imageUrl = r.brand.brandImage
                        })

                    this.app.open()
                }
            })
        })
    }
}
