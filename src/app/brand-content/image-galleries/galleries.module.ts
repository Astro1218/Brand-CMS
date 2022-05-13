import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageGalleriesComponent } from './galleries.component';
import { GalleryDialogComponent } from './gallery-dialog.component';
import { ImageGalleryItemComponent } from './item/gallery-item.component';
import { GalleryItemDialogComponent } from './item/item-dialog.component';
import { DndModule } from 'ng2-dnd';
import { FileUploadModule } from 'primeng/primeng';
import { MobileDialogComponent } from './item/mobile-dialog.component';

@NgModule({
    imports: [
        CommonModule, 
        MaterialModule, 
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule, 
        DndModule.forRoot(),
        FileUploadModule
    ],
    exports: [],
    declarations: [ImageGalleriesComponent, GalleryDialogComponent, ImageGalleryItemComponent, GalleryItemDialogComponent,MobileDialogComponent],
    providers: [],
    entryComponents: [
        GalleryDialogComponent,
        GalleryItemDialogComponent,
        MobileDialogComponent
    ]
})
export class ImageGalleriesModule { }
