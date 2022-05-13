import { ReactiveFormsModule } from '@angular/forms'
import { FAQDialogComponent } from './faqs-dialog.component'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../../material.module'
import { NgModule } from '@angular/core'

import { CustomerFAQsComponent } from './customer-faqs.component'


@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [CustomerFAQsComponent, FAQDialogComponent],
    providers: [],
    entryComponents:[
        FAQDialogComponent
    ]
})
export class CustomerFAQsModule { }
