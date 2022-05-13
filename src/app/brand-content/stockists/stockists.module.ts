import { RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from '../../material.module'
import { AgmCoreModule } from '@agm/core'
import { StockistDialogComponent } from './stockist-dialog.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { StockistsComponent } from './stockists.component'
import { FileUploadModule } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDU1WcgwZzaK9b2vziSYKf6v8N5LPT_SwM'
        }),
        RouterModule,
        FileUploadModule
    ],
    exports: [],
    declarations: [StockistsComponent, StockistDialogComponent],
    providers: [],
    entryComponents: [StockistDialogComponent]
})
export class StockistsModule { }
