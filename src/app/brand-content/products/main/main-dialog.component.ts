import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'main-dailog',
    templateUrl: './main-dialog.component.html'
})

export class MainDialogComponent implements OnInit {
    model
    mainForm: FormGroup
    options: Array<any> = []

    constructor(
        public dialogRef: MdDialogRef<MainDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        console.log(this.data)
        this.mainForm = this.fb.group({
            mainCategoryId: [0],
            cmsActiveOverride: [false],
            overrideSubCategory: [],
            categoryDescription: ['']
        })

        var overrideSubCategory = this.mainForm.controls['overrideSubCategory']
        !this.data.isTriton ? overrideSubCategory.disable() : overrideSubCategory.enable()

        this.mainForm.patchValue(this.data.data)

        this.options = this.data.isTriton ? [{ name: 'On', value: true }, { name: 'Off', value: false }] : [{ name: 'Not Set', value: null }, { name: 'On', value: true }, { name: 'Off', value: false }]
    }
}
