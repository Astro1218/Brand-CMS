import { CommonService, ILanguages } from '../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'cri-dialog',
    templateUrl: './cri-dialog.component.html'
})

export class CRIDialogComponent implements OnInit {
    languages: Array<ILanguages> = []
    model

    constructor(
        public dialogRef: MdDialogRef<CRIDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private commonService: CommonService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.commonService.getLanguages()
            //.do(r => console.log(r))
            .subscribe(r => this.languages = r)
    }
}