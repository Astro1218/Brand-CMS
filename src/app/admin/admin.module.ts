import { SettingsDialogComponent } from './brand/settings-dialog.component'
import { ErrorStatusComponent } from '../shared/error-status.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrandEditComponent } from './brand/brand-edit.component'
import { MaterialModule } from '../material.module'
import { adminRoutes } from './admin.routes'
import { AdminComponent } from './admin.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FileUploadModule } from 'primeng/primeng';
import { AdminResourceStringsComponent } from './resource-strings/resource-strings.component';
import { KeyValueDialogComponent } from './resource-strings/keyvalue.dialog.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FileUploadModule
    ],
    exports: [AdminComponent],
    declarations: [
        AdminComponent,
        BrandEditComponent,
        ErrorStatusComponent,
        SettingsDialogComponent,
        AdminResourceStringsComponent,
        KeyValueDialogComponent
    ],
    providers: [],
    entryComponents:[
        SettingsDialogComponent,
        KeyValueDialogComponent
    ]
})
export class AdminModule { }
