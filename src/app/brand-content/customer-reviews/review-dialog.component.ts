import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'review-dialog',
    templateUrl: './review-dialog.component.html',
})
export class ReviewDialogComponent implements OnInit {
    reviewForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<ReviewDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.reviewForm = this.fb.group({
            customerReviewId: [0],
            modelName: [''],
            primaryDescription: [''],
            modelId: [0],
            customerUserName: [''],
            customerEmail: [''],
            reviewTitle: [''],
            reviewComments: [''],
            rating: [0],
            adminComment: [''],
            adminApproved: [false],
            adminReviewed: [false],
            dateCreated: ['']
        })

        this.reviewForm.patchValue(this.data)
    }
}
