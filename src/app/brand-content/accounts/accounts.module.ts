import { NgModule } from '@angular/core';

import { AccountsComponent } from './accounts.component';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { ReactiveFormsModule, FormsModule } from '../../../../node_modules/@angular/forms';
import { MaterialModule } from '../../material.module';
import { AccountDialogComponent } from './account-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule
    ],
    exports: [],
    declarations: [AccountsComponent, AccountDialogComponent],
    providers: [],
    entryComponents:[AccountDialogComponent]
})
export class AccountsModule { }
