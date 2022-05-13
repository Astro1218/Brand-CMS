import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AdminService, ISiteSettings } from '../../services/admin.service'
import { ResourceStringsService } from '../../services/resource-strings.service';

@Component({
    selector: 'rs-dialog',
    templateUrl: './rs-dialog.component.html',
})
export class ResourceStringDialogComponent implements OnInit {
    settingsForm: FormGroup
    isNew: boolean
    codes: Array<any> = []
    keys: Array<any> = []

    constructor(
        public dialogRef: MdDialogRef<ResourceStringDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private adminService: AdminService,
        private fb: FormBuilder,
        private common: CommonService,
        private resourceStringsService:ResourceStringsService
    ) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            overrideValueId: [0],
            resourceStringKeyId: [''],
            value: ['']
        })

        this.isNew = this.data.isNew
        console.log(this.data)

        this.settingsForm.patchValue(this.data.data ? this.data.data : {})
    }
}
