import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';
import { ProductService, IMainCategory } from '../../services/product.service';

@Component({
    selector: 'pmr-item-dialog',
    templateUrl: './pmr-item-dialog.component.html'
})

export class PMRItemDialogComponent implements OnInit {
    form: FormGroup

    constructor(
        public dialogRef: MdDialogRef<PMRItemDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.form = this.fb.group({
            productMagazineReviewId: [0],
            productMagazineReviewItemId: [0],
            imageGalleryItemId: [0],
            title: ['', Validators.required],
            details: [''],
            cmsActive: [false],
            showHeadline: [false],
            pdfURL: [''],
            files: document.getElementById('files')
        })

        if (!this.data.isNew) {
            this.form.patchValue(this.data)
        }
    }
}