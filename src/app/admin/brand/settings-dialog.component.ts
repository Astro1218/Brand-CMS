import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AdminService, ISiteSettings } from '../../services/admin.service'

@Component({
    selector: 'settings-dialog',
    templateUrl: './settings-dialog.component.html',
})
export class SettingsDialogComponent implements OnInit {
    settingsForm: FormGroup
    isNew:boolean

    constructor(
        public dialogRef: MdDialogRef<SettingsDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private adminService: AdminService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            siteSettingId: [0],
            name: [''],
            value: [''],
            description: ['']
        })

        this.isNew = this.data.isNew

        this.settingsForm.patchValue(this.data.data ? this.data.data : {})
    }
}
