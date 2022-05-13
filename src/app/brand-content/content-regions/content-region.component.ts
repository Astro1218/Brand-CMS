import { CRDialogComponent } from './cr-dialog.component'
import { ContentRegionService, IContentRegions } from '../../services/content-region.service'
import { BrandComponent } from '../brand.component'
import { Component, OnInit } from '@angular/core'
import { MdDialog, MdSnackBar } from '@angular/material'

@Component({
    selector: 'content-region',
    templateUrl: './content-region.component.html'
})

export class ContentRegionComponent implements OnInit {
    columns: Array<string> = ['Description', 'Last Modified', 'Modified By']
    regions: Array<IContentRegions> = []
    loading: boolean = true
    
    isAdmin = JSON.parse(localStorage.getItem('cms_auth')).isAdmin

    constructor(
        private brand: BrandComponent,
        private contentRegionService: ContentRegionService,
        private dialog: MdDialog,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        this.getData(this.brand.brandId)

        if(this.isAdmin){
            this.columns.unshift('Content Region')
            this.columns.push('')
        }
    }

    getData(brandId: number) {
        this.contentRegionService.getContentRegions(brandId)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.regions = r
                this.loading = false
            })
    }

    deleteAll(model) {
        this.contentRegionService.deleteContentRegionAllItems(model.contentRegionId)
            //.do(r => console.log(r))
            .subscribe(r => {
                var index = this.regions.findIndex(region => region === model)
                this.regions.splice(index, 1)
                this.snack.open('Request completed', '', { duration: 3000 })
            })
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CRDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px',
            data: { brandId: this.brand.brandId }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getData(this.brand.brandId)
            }
        })
    }
}