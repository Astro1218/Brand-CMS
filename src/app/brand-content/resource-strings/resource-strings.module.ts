import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResourceStringsComponent } from './resource-strings.component';
import { ResourceStringDialogComponent } from './rs-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        ResourceStringsComponent,
        ResourceStringDialogComponent
    ],
    providers: [],
    entryComponents:[
        ResourceStringDialogComponent
    ]
})
export class ResourceStringsModule { }
