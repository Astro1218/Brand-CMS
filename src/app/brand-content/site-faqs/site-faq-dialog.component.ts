import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISiteFAQ } from '../../services/site-faqs.service';

@Component({
    selector: 'site-faqs-dialog',
    templateUrl: './site-faq-dialog.component.html',
})
export class SiteFAQDialogComponent implements OnInit {
    faq: ISiteFAQ
    faqForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<SiteFAQDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.faqForm = this.fb.group({
            siteFAQId: [0],
            brandId: [0],
            modifiedBy: [''],
            cmsActive: [false],
            question: ['', Validators.required],
            answer: ['', Validators.required]
        })
        if (!this.data.isNew)
            this.faqForm.patchValue(this.data.data)
    }
}
