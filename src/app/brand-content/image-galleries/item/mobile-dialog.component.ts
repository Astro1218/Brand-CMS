import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { CommonService } from '../../../services/common.service';
import { environment } from '../../../../environments/environment';
import { ImageGalleryService } from '../../../services/imageGallery.service';

@Component({
    selector: 'mobile-dialog',
    templateUrl: './mobile-dialog.component.html'
})

export class MobileDialogComponent implements OnInit {
    itemForm: FormGroup
    isNew: boolean

    maxFileSize: number = environment.uploadFileSize

    id: number
    name: string
    code: string
    loading: boolean = true
    upfiles
    uploadUrl

    msgs: any[]
    uploadedFiles: any[] = []

    constructor(
        public dialogRef: MdDialogRef<MobileDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private imageGalleryService: ImageGalleryService,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        //console.log(this.data.data)
        this.isNew = this.data.isNew

        this.uploadUrl = `${environment.api_url}ImageGallery/UploadMobile?CultureCode=${this.data.code}&Area=ImageGallery&Brand=${this.data.brand}&Id=${this.data.data.imageGalleryItemId}`

        this.itemForm = this.fb.group({
            filename: [''],
            mobileImageGalleryItemId: [0],
            imageGalleryItemId: [0],
            imageUrl: ['']
        })

        if (!this.isNew)
            this.get()
    }

    get() {
        this.imageGalleryService.getMobileImage(this.data.data.imageGalleryItemId).subscribe(r => {
            console.log(r)
            if (r)
                this.itemForm.patchValue(r)
            else {
                this.itemForm.controls['imageUrl'].setValue('')
                this.uploadedFiles = [];
            }
        })
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file)
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' })

        this.snackBar.open('Successfully uploaded.', '', { duration: 3000 })
        this.get()
    }

    onError(event) {
        this.snackBar.open('An error occured. Please check file size.', '', { duration: 3000 })
    }

    delete(model) {
        console.log(model)
        this.imageGalleryService.deleteMobileImageGalleryItem(this.data.data.imageGalleryItemId, model.mobileImageGalleryItemId).subscribe(r => {
            this.snackBar.open('Successfully deleted.', '', { duration: 3000 })
            this.get()
        })
    }
}
