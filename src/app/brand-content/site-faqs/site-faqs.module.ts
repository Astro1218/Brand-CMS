import { NgModule } from '@angular/core';

import { SiteFAQsComponent } from './site-faqs.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { SiteFAQDialogComponent } from './site-faq-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [],
    declarations: [
        SiteFAQsComponent,
        SiteFAQDialogComponent
    ],
    providers: [],
    entryComponents:[
        SiteFAQDialogComponent
    ]
})
export class SiteFAQsModule { }
