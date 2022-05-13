import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from "@angular/material";

@Component({
    selector: 'sub-dailog',
    templateUrl: './sub-dialog.component.html'
})

export class SubDialogComponent implements OnInit {
    model
    subForm: FormGroup
    passed: boolean = false

    constructor(
        public dialogRef: MdDialogRef<SubDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        console.log(this.data)

        this.subForm = this.fb.group({
            subCategoryId: [0],
            cmsActiveOverride: []
        })

        this.subForm.patchValue(this.data)

        if (this.data.showImageUploaded) {
            console.log('showImageUploaded')
            this.passed = this.data.imageUploaded

            return false
        }

        this.passed = true
    }
}
