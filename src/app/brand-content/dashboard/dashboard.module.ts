import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [MaterialModule, CommonModule, ReactiveFormsModule],
    exports: [],
    declarations: [DashboardComponent],
    providers: [],
})
export class DashboardModule { }
