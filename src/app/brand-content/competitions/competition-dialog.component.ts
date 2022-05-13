import { ILanguages } from '../../services/stockist.services';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageGalleryService, IImageGallery } from '../../services/imageGallery.service';
import { ProductService, IMainCategory } from '../../services/product.service';

@Component({
    selector: 'competition-dialog',
    templateUrl: './competition-dialog.component.html'
})

export class CompetitionDialogComponent implements OnInit {
    form: FormGroup
    galleries: Array<IImageGallery> = []
    isNew: boolean
    languages: Array<ILanguages> = []

    constructor(
        public dialogRef: MdDialogRef<CompetitionDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private image: ImageGalleryService,
        private commonService: CommonService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.isNew = this.data.isNew

        this.image.getImageGalleries(this.data.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.galleries = r)

        this.commonService.getLanguages()
            //.do(r => console.log(r))
            .subscribe(r => this.languages = r)

        this.form = this.fb.group({
            competitionId: [0],
            competitionName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 _.-]+$/)]],
            brandId: [0],
            imageGalleryId: ['', Validators.required],
            languageId: ['', Validators.required],
            cmsOrder: [0],
            cmsActive: [false]
        })

        if (!this.data.isNew) {
            this.form.patchValue(this.data.data)
        }
    }
}