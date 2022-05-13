import { Component, OnInit } from '@angular/core';
import { IProductMagazineReviewItem, MagazineReviewsService } from '../../services/magazine-reviews.service';
import { BrandComponent } from '../brand.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PMRItemDialogComponent } from './pmr-item-dialog.component';

@Component({
    selector: 'pmr-item',
    templateUrl: './pmr-item.component.html'
})

export class PMRItemComponent implements OnInit {
    list: Array<IProductMagazineReviewItem> = []
    itemId: number

    constructor(
        private mrService: MagazineReviewsService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.itemId = +params['itemId']
            this.get(this.itemId)
        })
    }

    get(itemId) {

        this.mrService.getItem(itemId)
            .do(r => console.log(r))
            .subscribe(r => this.list = r)
    }

    remove(model) {
        var fd = new FormData();
        fd.append('productMagazineReviewId', String(this.itemId))
        fd.append('productMagazineReviewItemId', String(model.productMagazineReviewItemId))
        fd.append('imageGalleryItemId', String(model.imageGalleryItemId))
        fd.append('title', model.title)
        fd.append('details', model.details)
        fd.append('cmsActive', String(model.cmsActive))
        fd.append('showHeadline', String(model.showHeadline))
        fd.append('pdfURL', String(model.pdfURL))

        this.mrService.deletePdf(fd)
            .subscribe(r => {
                this.get(this.itemId)
                this.snackBar.open('Magazine Review Item PDF Removed', '', { duration: 3000 })
            })
    }

    openDialog(model: IProductMagazineReviewItem) {
        const dialogRef = this.dialog.open(PMRItemDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (!result) {
                    return
                }


                var model: IProductMagazineReviewItem = result;
                if (result.delete) {
                    this.remove(result.delete);
                    return;
                }

                if (model) {
                    Object.assign(model, { productMagazineReviewId: this.itemId })
                    if (!model.cmsActive)
                        model.cmsActive = false
                    if (!model.showHeadline)
                        model.showHeadline = false
                    if (!model.productMagazineReviewItemId)
                        model.productMagazineReviewItemId = 0

                    console.log(model)
                    console.log(model.files.files)

                    var fd = new FormData();
                    // file already exists
                    if (!model.pdfURL)
                        if (model.files.files.length > 0) {
                            fd.append('file', model.files.files[0]);
                        }

                    fd.append('productMagazineReviewId', String(this.itemId))
                    fd.append('productMagazineReviewItemId', String(model.productMagazineReviewItemId))
                    fd.append('imageGalleryItemId', String(model.imageGalleryItemId))
                    fd.append('title', model.title)
                    fd.append('details', model.details || '')
                    fd.append('cmsActive', String(model.cmsActive))
                    fd.append('showHeadline', String(model.showHeadline))
                    fd.append('brand', this.brand.brand)
                    fd.append('brandId', String(this.brand.brandId))
                    fd.append('pdfURL', String(model.pdfURL || ''))

                    this.mrService.postItem(fd)
                        .subscribe(r => {
                            this.get(this.itemId)
                            this.snackBar.open('Magazine Review Item Updated', '', { duration: 3000 })
                        }, e => {
                            console.log(e)
                            this.snackBar.open('File must be PDF.', '', { duration: 3000 })
                        })
                }
            })
    }
}