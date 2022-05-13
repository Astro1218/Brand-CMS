import { ContentCollectionService, IContentCollection } from '../../services/content-collection.service';
import { ActivatedRoute } from '@angular/router';
import { BrandComponent } from '../brand.component';
import { Component, OnInit } from '@angular/core';
import { ContentCollectionItemDialogComponent } from './cc-item-dialog.component';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'content-collection-item',
    templateUrl: './content-collection-item.component.html'
})

export class ContentCollectionItemComponent implements OnInit {
    returnLink
    contentCollectionId: number
    columns: Array<string> = ['Title', 'Details', 'Culture Code', '']
    items: Array<any> = []
    collection: IContentCollection
    loading: boolean = true

    constructor(
        private brand: BrandComponent,
        private route: ActivatedRoute,
        private contentCollectionService: ContentCollectionService,
        private dialog: MdDialog
    ) { }

    ngOnInit() {
        this.returnLink = ['/', this.brand.brand, this.brand.brandId, 'content-collections']

        this.route.params.subscribe(params => {
            this.contentCollectionId = +params['collectionId']
            this.get(this.contentCollectionId)
        })
    }

    get(contentCollectionId: number) {
        this.contentCollectionService.getItems(contentCollectionId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.items = r
                this.loading = false
            })

        this.contentCollectionService.getContentCollection(contentCollectionId)
            .do(r => console.log(r))
            .subscribe(r => this.collection = r)
    }

    openDialog(model, isNew: boolean) {
        const dialogRef = this.dialog.open(ContentCollectionItemDialogComponent, {
            data: { data: model, isNew: isNew },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result) {
                    return false
                }

                result.form.contentCollectionId = this.contentCollectionId

                this.contentCollectionService.insertItem(result.form)
                    .do(r => console.log(r))
                    .subscribe(r => {
                        this.get(this.contentCollectionId)
                    })
            })
    }
}