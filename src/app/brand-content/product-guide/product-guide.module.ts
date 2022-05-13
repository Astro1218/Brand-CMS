import { NgModule } from '@angular/core';

import { ProductGuideComponent } from './product-guide.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { GuideDialogComponent } from './guide-dialog.component';
import { ProductGuideItemComponent } from './guide-item.component';
import { RouterModule } from '@angular/router';
import { GuideItemDialogComponent } from './item-dialog.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MaterialModule,RouterModule],
    exports: [],
    declarations: [ProductGuideComponent, GuideDialogComponent, ProductGuideItemComponent,GuideItemDialogComponent],
    providers: [],
    entryComponents: [
        GuideDialogComponent,
        GuideItemDialogComponent
    ]
})
export class ProductGuideModule { }
