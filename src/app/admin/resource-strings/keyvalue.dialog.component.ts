import { CommonService } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AdminService, ISiteSettings } from '../../services/admin.service'
import { ResourceStringsService } from '../../services/resource-strings.service';

@Component({
    selector: 'keyvalue-dialog',
    templateUrl: './keyvalue.dialog.component.html',
})
export class KeyValueDialogComponent implements OnInit {
    settingsForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<KeyValueDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.settingsForm = this.fb.group({
            key: [''],
            value: ['']
        })
    }
}