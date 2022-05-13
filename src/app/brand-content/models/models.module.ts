import { ModelsDialogComponent } from './models-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModelsComponent } from './models.component';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [ModelsComponent, ModelsDialogComponent],
    providers: [],
    entryComponents: [
        ModelsDialogComponent
    ]
})
export class ModelsModule { }
