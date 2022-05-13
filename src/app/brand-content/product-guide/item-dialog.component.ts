import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';
import { ProductService, IMainCategory } from '../../services/product.service';

@Component({
    selector: 'item-dialog',
    templateUrl: './item-dialog.component.html'
})

export class GuideItemDialogComponent implements OnInit {
    form: FormGroup

    constructor(
        public dialogRef: MdDialogRef<GuideItemDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.form = this.fb.group({
            mainCatGuideItemId: [0],
            imageGalleryItemId: [0],
            title: [''],
            description: [''],
            cmsActive: [false]
        })

        if (!this.data.isNew) {
            this.form.patchValue(this.data)
        }
    }
}