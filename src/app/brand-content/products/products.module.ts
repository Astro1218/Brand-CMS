import { ProductDialogComponent } from './product/prod-dialog.component';
import { SubDialogComponent } from './sub/sub-dialog.component';
import { MainDialogComponent } from './main/main-dialog.component';
import { ListProductComponent } from './product/list-prod.component';
import { ListSubComponent } from './sub/list-sub.component';
import { ListMainComponent } from './main/list-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';

import { ProductsComponent } from './products.component';
import { DndModule } from "ng2-dnd";
import { PromoVideoDialogComponent } from './product/promo-dialog.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DndModule.forRoot()
    ],
    exports: [],
    declarations: [
        ProductsComponent,
        ListMainComponent,
        ListSubComponent,
        ListProductComponent,
        MainDialogComponent,
        SubDialogComponent,
        ProductDialogComponent,
        PromoVideoDialogComponent
    ],
    providers: [],
    entryComponents: [
        MainDialogComponent,
        SubDialogComponent,
        ProductDialogComponent,
        PromoVideoDialogComponent
    ]
})
export class ProductsModule { }
