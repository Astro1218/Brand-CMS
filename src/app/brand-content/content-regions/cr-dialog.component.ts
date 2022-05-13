import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cr-dialog',
    templateUrl: './cr-dialog.component.html'
})

export class CRDialogComponent implements OnInit {
    brandId: number

    constructor(
        public dialogRef: MdDialogRef<CRDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() { 
        this.brandId = this.data.brandId
    }

    addCallback(flag) {
        if (flag)
            this.dialogRef.close('Completed')
    }
}