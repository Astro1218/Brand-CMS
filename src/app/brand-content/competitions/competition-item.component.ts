import { Component, OnInit } from '@angular/core';
import { BrandComponent } from '../brand.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CompetitionItemDialogComponent } from './competition-item-dialog.component';
import { ICompetitionItem, CompetitionService } from '../../services/competition.service';

@Component({
    selector: 'competition-item',
    templateUrl: './competition-item.component.html'
})

export class CompetitionItemComponent implements OnInit {
    list: Array<ICompetitionItem> = []
    itemId: number

    constructor(
        private service: CompetitionService,
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

        this.service.getItem(itemId)
            .do(r => console.log(r))
            .subscribe(r => this.list = r)
    }

    remove(model) {
        var fd = new FormData();
        fd.append('competitionId', String(this.itemId))
        fd.append('competitionItemId', String(model.competitionItemId))
        fd.append('imageGalleryItemId', String(model.imageGalleryItemId))
        fd.append('title', model.title)
        fd.append('details', model.details)
        fd.append('cmsActive', String(model.cmsActive))
        fd.append('pdfURL', String(model.pdfURL))

        this.service.deletePdf(fd)
            .subscribe(r => {
                this.get(this.itemId)
                this.snackBar.open('Competition Item PDF Removed', '', { duration: 3000 })
            })
    }

    openDialog(model: ICompetitionItem) {
        const dialogRef = this.dialog.open(CompetitionItemDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (!result) {
                    return
                }


                var model: ICompetitionItem = result;
                if (result.delete) {
                    this.remove(result.delete);
                    return;
                }

                if (model) {
                    Object.assign(model, { competitionId: this.itemId })
                    if (!model.cmsActive)
                        model.cmsActive = false
                    if (!model.competitionItemId)
                        model.competitionItemId = 0

                    console.log(model)
                    console.log(model.files.files)

                    var fd = new FormData();
                    // file already exists
                    if (!model.pdfURL)
                        if (model.files.files.length > 0) {
                            fd.append('file', model.files.files[0]);
                        }

                    fd.append('competitionId', String(this.itemId))
                    fd.append('competitionItemId', String(model.competitionItemId))
                    fd.append('imageGalleryItemId', String(model.imageGalleryItemId))
                    fd.append('title', model.title)
                    fd.append('details', model.details || '')
                    fd.append('cmsActive', String(model.cmsActive))
                    fd.append('brand', this.brand.brand)
                    fd.append('brandId', String(this.brand.brandId))
                    fd.append('pdfURL', String(model.pdfURL || ''))

                    this.service.postItem(fd)
                        .subscribe(r => {
                            this.get(this.itemId)
                            this.snackBar.open('Magazine Review Item Updated', '', { duration: 3000 })
                        }, e => {
                            console.log(e)
                            if (e.error === 'File must be PDF.')
                                this.snackBar.open('File must be PDF.', '', { duration: 3000 })
                            else
                                this.snackBar.open(e.error, '', { duration: 3000 })
                        })
                }
            })
    }
}