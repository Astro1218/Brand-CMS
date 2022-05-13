import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ReviewDialogComponent } from './review-dialog.component'
import { MaterialModule } from '../../material.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CustomerReviewsComponent } from './customer-reviews.component'

@NgModule({
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
    exports: [],
    declarations: [CustomerReviewsComponent, ReviewDialogComponent],
    providers: [],
    entryComponents:[ReviewDialogComponent]
})
export class CustomerReviewsModule { }
