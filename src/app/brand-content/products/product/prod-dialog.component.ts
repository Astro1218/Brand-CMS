import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'prod-dailog',
    templateUrl: './prod-dialog.component.html'
})

export class ProductDialogComponent implements OnInit {
    model
    prodForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<ProductDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        console.log(this.data)

        this.prodForm = this.fb.group({
            productId: [0],
            cmsActiveOverride: [false],
            featuredProductActive: []
        })

        this.prodForm.patchValue(this.data)
    }
}
