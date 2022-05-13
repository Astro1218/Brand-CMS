import { BrandComponent } from '../brand.component';
import { IImageGallery, ImageGalleryService } from '../../services/imageGallery.service';
import { Component, OnInit } from '@angular/core';
import { GalleryDialogComponent } from './gallery-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
    selector: 'galleries',
    templateUrl: './galleries.component.html'
})

export class ImageGalleriesComponent implements OnInit {
    columns: Array<string> = ['Description', 'Culture Code', 'Width', 'Height', '']
    galleries: Array<IImageGallery> = []
    loading: boolean = true
    isAdmin = true;//JSON.parse(localStorage.getItem('cms_auth')).isAdmin

    // filtering options
    selected_language = 'en-GB'
    search_text = ''
    existing_codes = []
    galleries_main: Array<IImageGallery> = []

    constructor(
        private imageGalleryService: ImageGalleryService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.getData(this.brand.brandId)

        if (this.isAdmin) {
            this.columns.unshift('Gallery Name')
        }
    }

    openDialog(model: IImageGallery, isNew: boolean): void {
        let dialogRef = this.dialog.open(GalleryDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px',
            data: { data: model, isNew: isNew, isAdmin: this.isAdmin }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return false

            if (result.delete) {
                let imageGalleryId = result.delete.imageGalleryId
                //console.log('delete')
                this.imageGalleryService.deleteImageGalleryAndAllItems(imageGalleryId)
                    //.do(r => console.log(r))
                    .subscribe(
                        r => {
                            let index = this.galleries.findIndex(im => im.imageGalleryId === imageGalleryId)

                            this.galleries.splice(index, 1)
                            this.snackBar.open('Successfully removed Image Gallery', '', { duration: 3000 })
                        })

                return false
            }

            if (result) {
                result.brandId = this.brand.brandId
                this.imageGalleryService.insertImageGallery(result)
                    .subscribe(
                        r => {
                            if (isNew) {
                                this.getData(this.brand.brandId)
                                this.snackBar.open('Successfully added Image Gallery', '', { duration: 3000 })
                            }
                            else {
                                this.getData(this.brand.brandId)
                                // var row = this.galleries.find(im => im.imageGalleryId === result.imageGalleryId)

                                // row.description = result.description
                                // row.cultureCode = result.cultureCode
                                // row.imageGalleryName = result.imageGalleryName
                                // row.languageId = result.languageId

                                this.snackBar.open('Successfully updated Image Gallery', '', { duration: 3000 })
                            }
                        })
            }
        });
    }

    getData(brandId: number) {
        this.imageGalleryService.getImageGalleries(brandId)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.galleries = r
                this.galleries_main = r
                this.loading = false

                this.galleries_main.forEach(element => {
                    if (this.existing_codes.indexOf(element.cultureCode) === -1) {
                        this.existing_codes.push(element.cultureCode)
                    }
                });
                this.filterGallery(this.selected_language)


            })
    }

    filterGallery(selectedLanguage) {
        if (selectedLanguage == '')
            this.galleries = this.galleries_main
        else
            this.galleries = this.galleries_main.filter(x => x.cultureCode == selectedLanguage)

    }
    filterDescription(searchText) {
        if (searchText == '')
            this.filterGallery(this.selected_language)
        else
            this.galleries = this.galleries_main.filter(x => x.description.toLowerCase().includes(searchText.toLowerCase()))
    }
}