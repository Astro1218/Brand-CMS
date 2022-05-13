import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'gallery-dialog',
    templateUrl: './gallery-dialog.component.html'
})

export class GalleryDialogComponent implements OnInit {
    galleryForm: FormGroup
    languages: Array<ILanguages> = []
    isNew: boolean

    constructor(
        public dialogRef: MdDialogRef<GalleryDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private commonService: CommonService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.isNew = this.data.isNew

        this.commonService.getLanguages()
            //.do(r => console.log(r))
            .subscribe(r => this.languages = r)

        this.galleryForm = this.fb.group({
            brandId: [0],
            cultureCode: [''],
            description: ['', Validators.required],
            imageGalleryId: [0],
            imageGalleryName: ['', Validators.required],
            languageId: [null, Validators.required],
            height: [0],
            width: [0]
        })

        if (!this.data.isNew) {
            this.galleryForm.patchValue(this.data.data)
            this.galleryForm.controls['languageId'].disable()
        }
    }
}