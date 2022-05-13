import { ImageService } from '../services/image.service'
import { AdminService, IBrands } from '../services/admin.service'
import { AppComponent } from '../app.component'

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {
    brand: string
    brands: Array<IBrands> = []
    error: object

    constructor(
        private app: AppComponent,
        private route: ActivatedRoute,
        private adminService: AdminService,
        private imageService: ImageService,
        private snackBar: MdSnackBar,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.authAdmin().subscribe(r => {
            if (!r.isAdmin) {
                this.router.navigate(['401'])
                return false
            } else {
                this.route.params.subscribe(params => {
                    this.brand = params['brand']
                    this.app.selectedBrand = params['brand']
                })

                this.app.adminOpen()

                this.adminService.getBrands()
                    .subscribe(r => this.brands = r)
            }
        })
    }

    getImage(brand, brandImage) {
        return this.imageService.getUrl(brand, brandImage)
    }
}
