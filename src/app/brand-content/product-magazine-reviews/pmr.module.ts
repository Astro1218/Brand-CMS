import { NgModule } from '@angular/core';

import { PMRComponent } from './pmr.component';
import { PMRItemComponent } from './pmr-item.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MagazineReviewsService } from '../../services/magazine-reviews.service';
import { PMRDialogComponent } from './pmr-dialog.component';
import { PMRItemDialogComponent } from './pmr-item-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        PMRComponent,
        PMRItemComponent,
        PMRDialogComponent,
        PMRItemDialogComponent
    ],
    providers: [
        MagazineReviewsService
    ],
    entryComponents:[
        PMRDialogComponent,
        PMRItemDialogComponent
    ]
})
export class PMRModule { }
