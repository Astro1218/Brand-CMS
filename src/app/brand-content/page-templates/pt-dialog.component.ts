import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';

@Component({
    selector: 'pt-dialog',
    templateUrl: './pt-dialog.component.html'
})

export class TemplateDialogComponent implements OnInit {
    ptForm: FormGroup
    galleries: Array<IImageGallery> = []
    isNew: boolean

    constructor(
        public dialogRef: MdDialogRef<TemplateDialogComponent>,
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

        this.ptForm = this.fb.group({
            pageTemplateId: [0],
            brandId: [0],
            pageTemplateName:['', Validators.required],
            title: [''],
            products: [''],
            imageGalleryId: [0, Validators.required],
            showReviews: [false],
            metaDescription: ['']
        })

        if (!this.data.isNew) {
            this.ptForm.patchValue(this.data.data)
        }
    }
}
