import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomerFAQ, CustomerFAQsService } from '../../services/customer-faqs.service'

@Component({
    selector: 'faqs-dialog',
    templateUrl: './faqs-dialog.component.html',
})
export class FAQDialogComponent implements OnInit {
    faq: ICustomerFAQ
    faqForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<FAQDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private customerFAQsService: CustomerFAQsService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.faqForm = this.fb.group({
            id: [0],
            modelId:[0],
            modelName: [''],
            question: ['', Validators.required],
            answer: ['', Validators.required],
            adminApproved: [false]
        })
        this.faqForm.patchValue(this.data)
    }
}
