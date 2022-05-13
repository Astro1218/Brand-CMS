import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';
import { ProductService, IMainCategory } from '../../services/product.service';

@Component({
    selector: 'guide-dialog',
    templateUrl: './guide-dialog.component.html'
})

export class GuideDialogComponent implements OnInit {
    form: FormGroup
    galleries: Array<IImageGallery> = []
    mains: Array<IMainCategory> = []
    isNew: boolean

    constructor(
        public dialogRef: MdDialogRef<GuideDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private image: ImageGalleryService,
        private main: ProductService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.isNew = this.data.isNew

        this.image.getImageGalleries(this.data.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.galleries = r)

        this.main.getMainCategories(this.data.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.mains = r)

        this.form = this.fb.group({
            mainCatGuideId: [0],
            imageGalleryId: [0, Validators.required],
            brandId: [0],
            mainCategoryId: [0],
            mainCategory: [''],
            cmsActive: [false]
        })

        if (!this.data.isNew) {
            this.form.patchValue(this.data.data)
        }
    }
}