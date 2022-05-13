import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AdminService, ISiteSettings } from '../../services/admin.service'

@Component({
    selector: 'cc-item-dialog',
    templateUrl: './cc-item-dialog.component.html',
})
export class ContentCollectionItemDialogComponent implements OnInit {
    settingsForm: FormGroup
    isNew: boolean
    codes: Array<any> = []

    constructor(
        public dialogRef: MdDialogRef<ContentCollectionItemDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private adminService: AdminService,
        private fb: FormBuilder,
        private common: CommonService
    ) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            contentCollectionId: [0],
            contentCollectionItemId: [0],
            languageId: [0],
            title: ['', Validators.required],
            details: ['', Validators.required],
            altTag: [''],
            cultureImageFilename: ['']
        })

        this.isNew = this.data.isNew

        this.settingsForm.patchValue(this.data.data ? this.data.data : {})

        this.common.getLanguages().do(r => console.log(r)).subscribe(r => this.codes = r)
    }
}
