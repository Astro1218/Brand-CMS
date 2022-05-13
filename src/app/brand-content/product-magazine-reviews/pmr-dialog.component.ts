import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';
import { ProductService, IMainCategory } from '../../services/product.service';

@Component({
    selector: 'pmr-dialog',
    templateUrl: './pmr-dialog.component.html'
})

export class PMRDialogComponent implements OnInit {
    form: FormGroup
    galleries: Array<IImageGallery> = []
    isNew: boolean

    constructor(
        public dialogRef: MdDialogRef<PMRDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private image: ImageGalleryService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.isNew = this.data.isNew

        this.image.getImageGalleries(this.data.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.galleries = r)

        this.form = this.fb.group({
            productMagazineReviewId: [0],
            imageGalleryId: ['', Validators.required],
            brandId: [0],
            productSKU: ['', Validators.required],
            cmsActive: [false],
            cmsOrder: [0]
        })

        if (!this.data.isNew) {
            this.form.patchValue(this.data.data)
        }
    }
}