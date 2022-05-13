import { NgModule } from '@angular/core';

import { PageTemplatesComponent } from './page-templates.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDialogComponent } from './pt-dialog.component';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [PageTemplatesComponent, TemplateDialogComponent],
    providers: [],
    entryComponents:[TemplateDialogComponent]
})
export class PageTemplatesModule { }
