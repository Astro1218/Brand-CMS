import { BrandComponent } from '../brand.component'
import {
    ContentCollectionService,
    IContentCollection,
    IContentCollectionTypes,
} from '../../services/content-collection.service'
import { Component, OnInit } from '@angular/core'
import { ContentCollectionDialogComponent } from './cc-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
    selector: 'content-collection',
    templateUrl: './content-collection.component.html'
})

export class ContentCollectionComponent implements OnInit {
    columns: Array<string> = ['Title', 'Type', '']
    collections: Array<IContentCollection> = []
    filteredCollections: Array<IContentCollection> = []
    types: Array<IContentCollectionTypes> = []
    loading: boolean = true

    constructor(
        private contentCollectionService: ContentCollectionService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get() {
        this.loading = true
        this.contentCollectionService.getContentCollections(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.collections = r.collections
                this.types = r.types
                this.filteredCollections = r.collections
                this.loading = false
            })
    }

    onChange(event) {
        console.log(event.value)
        if (event.value == 0) {
            console.log(this.collections)
            this.filteredCollections = this.collections
        } else
            this.filteredCollections = this.collections.filter(col => col.contentCollectionTypeId === event.value)
    }

    openDialog(model, isNew: boolean) {
        const dialogRef = this.dialog.open(ContentCollectionDialogComponent, {
            data: { data: model, isNew: isNew, brandId: this.brand.brandId },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result)
                    return false

                if (result.form) {
                    result.form.brandId = this.brand.brandId
                    result.form.cmsOrder = 0

                    this.contentCollectionService.insert(result.form)
                        .do(r => console.log(r))
                        .subscribe(r => {
                            this.get()
                            this.snack.open(isNew ? 'Added content collection' : 'Updated content collection', '', { duration: 4000 })
                        })
                }

                if (result.delete) {
                    console.log(result.delete)
                    this.contentCollectionService.delete(result.delete.contentCollectionId)
                        .do(r => console.log(r))
                        .subscribe(r => {
                            var index = this.collections.findIndex(x => x.contentCollectionId === result.delete.contentCollectionId)
                            this.collections.splice(index, 1)
                            this.snack.open('Delete content collection', '', { duration: 4000 })
                        })

                }
            })
    }
}
