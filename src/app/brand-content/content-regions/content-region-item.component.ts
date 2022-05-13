import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentRegionService, IContentRegionItem } from '../../services/content-region.service';
import { BrandComponent } from '../brand.component';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { CRIDialogComponent } from './cri-dialog.component';

@Component({
    selector: 'content-region-item',
    templateUrl: './content-region-item.component.html',
    styles: [`
    .active{
        background: #ddd;
    }
    `]
})

export class ContentRegionItemComponent implements OnInit {
    returnLink
    columns: Array<string> = ['Content Region']
    items: Array<IContentRegionItem> = []
    loading: boolean = true
    text: string
    clearText: string
    selectedRegion
    contentRegionId: number
    brandId: number
    isHTML: boolean = false
    isAdmin = JSON.parse(localStorage.getItem('cms_auth')).isAdmin

    constructor(
        private brand: BrandComponent,
        private contentRegionService: ContentRegionService,
        private route: ActivatedRoute,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.returnLink = ['/', this.brand.brand, this.brand.brandId, 'content-regions']
        this.brandId = this.brand.brandId

        this.route.params.subscribe(params => {
            this.contentRegionId = +params['contentRegionId']
            this.get(this.contentRegionId)
        })
    }

    get(contentRegionId) {
        this.contentRegionService.getContentRegionItems(contentRegionId)
            .subscribe(r => {
                this.items = r
                this.loading = false
            })
    }

    insert(model) {
        this.contentRegionService.insertContentRegionItem(model)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.get(this.contentRegionId)
                this.snackBar.open(model.contentRegionItemId ? 'Content region updated.' : 'Content region submitted.', '', { duration: 3000 })
            })
    }

    updateItem() {
        var model = {
            contentRegionItemId: this.selectedRegion.contentRegionItemId,
            contentRegionId: this.contentRegionId,
            languageId: this.selectedRegion.languageId,
            contentRegionItem: this.text
        }
        this.insert(model)
    }

    deleteItem() {
        this.contentRegionService.deleteContentRegionItem(this.selectedRegion.contentRegionItemId)
            //.do(r => console.log(r))
            .subscribe(r => {
                var index = this.items.findIndex(item => item === this.selectedRegion)
                this.items.splice(index, 1)
                this.selectedRegion = null
                this.snackBar.open('Content region item deleted.', '', { duration: 3000 })
            })
    }

    edit(model) {
        this.selectedRegion = model
        this.text = model.contentRegionItem

        this.isHTML = this.text.startsWith('<p>') ? true : false
    }

    updateCallback(flag) {
        if (flag)
            console.log('Completed')
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CRIDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true
                var model = {
                    contentRegionItemId: 0,
                    contentRegionId: this.contentRegionId,
                    languageId: result,
                    contentRegionItem: ''
                }
                this.insert(model)
            }
        });
    }
}
