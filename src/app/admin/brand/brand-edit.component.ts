import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service'
import { AppComponent } from '../../app.component'
import { AdminService, IBrand, ISiteNavigation, ISiteSettings, IFeatureProduct, IFeatureProductLevel } from '../../services/admin.service'
import { Component, OnInit } from '@angular/core'
import { MdSnackBar, MdDialog, ENTER, MdChipInputEvent } from '@angular/material'
import { SettingsDialogComponent } from './settings-dialog.component'

const COMMA = 188;

@Component({
    selector: 'brand-edit',
    templateUrl: './brand-edit.component.html'
})

export class BrandEditComponent implements OnInit {
    brand: string = ''
    brandId: number = 0
    model: IBrand
    brandForm: FormGroup
    siteNavigation: Array<ISiteNavigation> = []
    columns: Array<String> = ['Description', 'Value']
    settings: Array<ISiteSettings> = []
    features: Array<IFeatureProductLevel> = []
    uploadUrl: string
    languageCodes: Array<any> = []

    constructor(
        private adminService: AdminService,
        private app: AppComponent,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        // initialise form
        this.brandForm = this.fb.group({
            cmsActive: [false],
            adGroup: [''],
            brandImage: [''],
            dateCreated: [],
            cmsDateModified: [],
            cmsModifiedBy: [''],
            featuredProductDisplayLevelId: [0],
            webDisplayLevel: ['']
        })

        this.authService.authAdmin().subscribe(r => {
            if (!r.isAdmin) {
                this.router.navigate(['401'])
                return false
            } else {
                this.app.adminOpen()

                this.route.params.subscribe(params => {
                    this.brand = params['brand']
                    this.brandId = params['brandId']
                })

                this.getBrandData(this.brandId)
                this.uploadUrl = `${environment.api_url}Admin/Upload?Area=Logo&Brand=${this.brand}&BrandId=${this.brandId}`

                this.adminService.getBrandLanguageIndex(this.brandId)
                    .do(r => console.log('getBrandLanguageIndex', r))
                    .subscribe(r => this.languageCodes = r)
            }
        })
    }

    getImage(brand) {
        return this.imageService.getUrl(brand, this.brandForm.value.brandImage)
    }

    getBrandData(brandId: number) {
        this.adminService.getBrandById(brandId)
            .do(r => console.log(r))
            .subscribe(
            r => {
                this.brandForm.patchValue(r.brand)
                this.siteNavigation = r.nav
                this.settings = r.settings
                this.features = r.feature
            })
    }

    insert(model: IBrand) {
        Object.assign(model, {
            BrandId: this.brandId,
            Brand: this.brand
        })

        this.adminService.insertBrand(model)
            .do(r => console.log(r))
            .subscribe(r => {
                this.snackMe('Successfully update brand settings.', '')
                this.getBrandData(this.brandId)
            })
    }

    snackMe(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        })
    }

    setNav(model) {
        Object.assign(model, { brandId: this.brandId })
        this.adminService.insertSiteNavigation(model)
            .subscribe(
            r => {
                this.snackMe('Successfully update site navigation.', '')
            })
    }

    openDialog(model: ISiteSettings, isNew: boolean) {
        const dialogRef = this.dialog.open(SettingsDialogComponent, {
            data: { data: model, isNew: isNew },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result) {
                    return false
                }

                if (result.form) {
                    var form: ISiteSettings = result.form
                    Object.assign(form, { brandId: Number(this.brandId) })

                    this.adminService.insertSiteSetting(form)
                        //.do(r => console.log(r))
                        .subscribe(r => {
                            var settings = this.settings.find(s => s.siteSettingId == r.siteSettingId)
                            if (settings) {
                                // override existing collection item
                                settings.description = form.description
                                settings.name = form.name
                                settings.value = form.value
                                this.snackMe('Successfully updated site setting', '')
                            } else {
                                var newSetting: ISiteSettings = {
                                    siteSettingId: r.siteSettingId,
                                    description: form.description,
                                    name: form.name,
                                    value: form.value
                                }
                                this.settings.push(newSetting)
                                this.snackMe('Successfully added site setting', '')
                            }
                        })
                }

                if (result.delete) {
                    var del: ISiteSettings = result.delete
                    this.adminService.deleteSiteSetting(del.siteSettingId)
                        .subscribe(
                        r => {
                            this.settings.splice(this.settings.indexOf(del), 1)
                            this.snackMe('Successfully deleted site setting', '')
                        })
                }
            })
    }

    deleteImage() {
        this.adminService.deleteBrandImage(this.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.getBrandData(this.brandId)
            })
        // this.imageGalleryService.deleteImageGalleryItem(this.id, result.imageGalleryItemId)
        //     //.do(r => console.log(r))
        //     .subscribe(
        //     r => {
        //         var index = this.items.findIndex(im => im.imageGalleryItemId === result.imageGalleryItemId)
        //         this.items.splice(index, 1)
        //         this.snackBar.open('Successfully removed Image Gallery Item', '', { duration: 3000 })
        //     })
    }

    onUpload(event) {
        console.log(event)
        this.getBrandData(this.brandId)
    }

    setIndex(model) {
        //console.log(model)
        Object.assign(model, { brandId: this.brandId })
        this.adminService.insertBrandLanguageIndex(model)
            .subscribe(r => this.snackMe('Successfully updated Brand Language.', ''))
    }
}
