import { ContentCollectionItemDialogComponent } from './cc-item-dialog.component';
import { ContentCollectionItemComponent } from './content-collection-item.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentCollectionComponent } from './content-collection.component';
import { ContentCollectionDialogComponent } from './cc-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        ContentCollectionComponent,
        ContentCollectionItemComponent,
        ContentCollectionItemDialogComponent,
        ContentCollectionDialogComponent
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
    entryComponents:[
        ContentCollectionItemDialogComponent,
        ContentCollectionDialogComponent
    ]
})
export class ContentCollectionModule { }
