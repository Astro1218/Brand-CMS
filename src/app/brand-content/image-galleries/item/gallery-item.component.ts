import { BrandComponent } from '../../brand.component';
import { IImageGalleryItem, ImageGalleryService, IImageGallery } from '../../../services/imageGallery.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { GalleryItemDialogComponent } from './item-dialog.component';
import { environment } from '../../../../environments/environment';
import { MobileDialogComponent } from './mobile-dialog.component';

@Component({
    selector: 'gallery-item',
    templateUrl: './gallery-item.component.html'
})
export class ImageGalleryItemComponent implements OnInit {
    maxFileSize: number = environment.uploadFileSize

    id: number
    name: string
    code: string
    items: Array<IImageGalleryItem> = []
    columns: Array<string> = ['', 'Image', 'Alt Tag', 'URL To Link To', 'New Tab', 'Title', 'Desc', 'Order', 'Active', 'Mobile Image', '', '']
    loading: boolean = true
    upfiles
    uploadUrl
    returnLink
    gallery: IImageGallery

    msgs: any[]
    uploadedFiles: any[] = []

    constructor(
        private route: ActivatedRoute,
        private imageGalleryService: ImageGalleryService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar,
        private brand: BrandComponent
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id']
            this.name = params['name']
            this.code = params['code']
            this.getData()
            this.uploadUrl = `${environment.api_url}ImageGallery/Upload?CultureCode=${params['code']}&Area=ImageGallery&Brand=${this.brand.brand}&Id=${+params['id']}&bId=${this.brand.brandId}`
            this.returnLink = ['/', this.brand.brand, this.brand.brandId, 'image-galleries']

            this.imageGalleryService.getImageGalleries(this.brand.brandId)
                .subscribe(r => {
                    this.gallery = r.find(x => x.imageGalleryId == this.id)
                })
        })
    }

    openDialog(model: IImageGalleryItem, isNew: boolean): void {
        let dialogRef = this.dialog.open(GalleryItemDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px',
            data: { data: model, isNew: isNew }
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (!result) {
                    return false
                }

                if (result.delete) {
                    this.delete(result.delete)
                    return false
                }
                if (result) {
                    this.updateInsertData(result, isNew)
                }
            });
    }

    mobileDialog(model: IImageGalleryItem, isNew: boolean): void {
        let dialogRef = this.dialog.open(MobileDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px',
            data: {
                data: model,
                isNew: !isNew,
                code: this.code,
                id: this.id,
                brand: this.brand.brand
            }
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                this.getData();
            });
    }

    onDrop(index, model: IImageGalleryItem) {
        if (index !== model.displayOrder) {
            var reordered = []
            this.items.forEach((o: IImageGalleryItem, i: number) => {
                reordered.push({
                    imageGalleryItemId: o.imageGalleryItemId,
                    displayOrder: i
                })
            })

            this.imageGalleryService.updateGalleryItemSort(this.id, reordered)
                //.do(r => console.log('updateGalleryItemSort', r))
                .subscribe(r => {
                    this.snackBar.open('Sorted!', '', { duration: 3000 })
                    this.getData()
                })
        }
    }

    getData() {
        this.imageGalleryService.getImageGalleryItems(this.id)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.loading = false
                this.items = r
            })
    }

    updateInsertData(result: IImageGalleryItem, isNew: boolean) {
        if (isNew) {
            result.imageGalleryId = this.id
            result.displayOrder = this.items.length
        }

        this.imageGalleryService.insertImageGalleryItem(result)
            .subscribe(
                r => {
                    if (isNew) {
                        this.getData()
                        this.snackBar.open('Successfully added Image Gallery Item', '', { duration: 3000 })
                    }
                    else {
                        this.getData()
                        // var row = this.items.find(im => im.imageGalleryItemId === result.imageGalleryItemId)

                        // row.filename = result.filename
                        // row.urLtoLinkTo = result.urLtoLinkTo
                        // row.itemDescription = result.itemDescription

                        this.snackBar.open('Successfully updated Image Gallery Item', '', { duration: 3000 })
                    }
                })
    }

    delete(result: IImageGalleryItem) {
        this.imageGalleryService.deleteImageGalleryItem(this.id, result.imageGalleryItemId)
            //.do(r => console.log(r))
            .subscribe(
                r => {
                    var index = this.items.findIndex(im => im.imageGalleryItemId === result.imageGalleryItemId)
                    this.items.splice(index, 1)
                    this.snackBar.open('Successfully removed Image Gallery Item', '', { duration: 3000 })
                })
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file)
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' })

        this.getData()

        this.snackBar.open('Successfully uploaded.', '', { duration: 3000 })
    }

    onError(event) {
        this.snackBar.open('An error occured. Please check file size.', '', { duration: 3000 })
    }
}
