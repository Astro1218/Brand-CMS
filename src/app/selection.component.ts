import { Router } from '@angular/router';
import { ImageService } from './services/image.service'
import { SelectionService } from './services/selection.service'
import { IBrands } from './services/admin.service'
import { AuthService, IAuth } from './services/auth.service'
import { AppComponent } from './app.component'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'selection',
    templateUrl: './selection.component.html'
})

export class SelectionComponent implements OnInit {
    brands: Array<IBrands> = []
    auth: IAuth
    noBrands: boolean = false
    str = "asd"
    constructor(
        private app: AppComponent,
        private authService: AuthService,
        private selectionService: SelectionService,
        private imageService: ImageService,
        private router: Router
    ) { }

    ngOnInit() {
        this.app.close()
        this.app.adminClose()

        this.authService.authAdmin()
            .subscribe(r => this.auth = r)

        // this.selectionService.getBrandsWithADCheck()
        //     .do(r => console.log(r))
        //     .subscribe(r => {
        //         this.brands = r
        //         this.noBrands = r.length == 0
        //     })

        this.brands.push({brand: "/image-galleries", brandId: 1, brandImage: "image1", cmsActive: true, adGroup: "string"})
        this.brands.push({brand: "string", brandId: 2, brandImage: "string", cmsActive: false, adGroup: "string"})
        this.brands.push({brand: "string", brandId: 3, brandImage: "string", cmsActive: false, adGroup: "string"})
        this.brands.push({brand: "string", brandId: 4, brandImage: "string", cmsActive: false, adGroup: "string"})
        this.brands.push({brand: "string", brandId: 5, brandImage: "string", cmsActive: false, adGroup: "string"})
    }

    getImage(brand, brandImage) {
        return this.imageService.getUrl(brand, brandImage)
    }

    authenticate(b) {
        this.router.navigate([b.brand, b.brandId, 'image-galleries'])
    }
}
