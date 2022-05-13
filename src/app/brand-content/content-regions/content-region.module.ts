import { ContentRegionFormComponent } from './content-region-form.component';
import { CRIDialogComponent } from './cri-dialog.component';
import { CRDialogComponent } from './cr-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentRegionComponent } from './content-region.component';
import { ContentRegionItemComponent } from './content-region-item.component';

import { EditorModule } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule
    ],
    exports: [],
    declarations: [
        ContentRegionComponent,
        ContentRegionItemComponent,
        CRDialogComponent,
        CRIDialogComponent,
        ContentRegionFormComponent
    ],
    providers: [],
    entryComponents:[
        CRDialogComponent,
        CRIDialogComponent
    ]
})
export class ContentRegionModule { }
