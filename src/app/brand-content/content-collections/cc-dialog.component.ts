import { ContentCollectionService } from '../../services/content-collection.service';
import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, ISiteSettings } from '../../services/admin.service'

@Component({
    selector: 'cc-dialog',
    templateUrl: './cc-dialog.component.html',
})
export class ContentCollectionDialogComponent implements OnInit {
    settingsForm: FormGroup
    isNew: boolean
    collectionTypes: Array<any> = []

    constructor(
        public dialogRef: MdDialogRef<ContentCollectionDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private adminService: AdminService,
        private fb: FormBuilder,
        private contentCollectionService: ContentCollectionService
    ) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            contentCollectionId: [0],
            brandId: [0],
            contentCollectionTypeId: ['', Validators.required],
            title: ['', Validators.required],
            details: ['', Validators.required],
            showHeadline: [false],
            altTag: [''],
            imageFilename: [''],
            urltoLinkTo: ['', Validators.required],
            publishStartDate: ['', Validators.required],
            publishEndDate: ['', Validators.required],
            cmsActive: [false]
        })

        this.contentCollectionService.getTypesByBrand(this.data.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.collectionTypes = r)

        this.isNew = this.data.isNew

        this.settingsForm.patchValue(this.data.data ? this.data.data : {})
    }
}
