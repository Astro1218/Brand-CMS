import { NgModule } from '@angular/core';

import { CompetitionComponent } from './competition.component';
import { CompetitionItemComponent } from './competition-item.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompetitionDialogComponent } from './competition-dialog.component';
import { CompetitionItemDialogComponent } from './competition-item-dialog.component';
import { CompetitionService } from '../../services/competition.service';
import { DndModule } from 'ng2-dnd';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        DndModule.forRoot()
    ],
    exports: [],
    declarations: [
        CompetitionComponent,
        CompetitionItemComponent,
        CompetitionDialogComponent,
        CompetitionItemDialogComponent
    ],
    providers: [
        CompetitionService
    ],
    entryComponents:[
        CompetitionDialogComponent,
        CompetitionItemDialogComponent
    ]
})
export class CompetitionModule { }
