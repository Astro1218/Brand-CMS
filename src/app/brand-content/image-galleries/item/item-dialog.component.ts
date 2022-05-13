import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'item-dialog',
    templateUrl: './item-dialog.component.html'
})

export class GalleryItemDialogComponent implements OnInit {
    itemForm: FormGroup
    isNew: boolean

    constructor(
        public dialogRef: MdDialogRef<GalleryItemDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private commonService: CommonService
    ) { }

    ngOnInit() {
        //console.log(this.data.data)
        this.isNew = this.data.isNew

        this.itemForm = this.fb.group({
            filename: [''],
            itemDescription: [''],
            urLtoLinkTo: [''],
            displayOrder: [0],
            imageGalleryId: [0],
            imageGalleryItemId: [0],
            imageUrl: [''],
            title: [''],
            altTag: ['', Validators.required],
            loadSeparateTab: [false],
            dateFrom: [null],
            dateTo: [null],
            cmsActive: [false],
            mobileImgExists: [false]
        })

        this.itemForm.patchValue(this.data.data || {})
    }
}
