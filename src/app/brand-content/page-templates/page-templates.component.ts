import { Component, OnInit } from '@angular/core';
import { PageTemplateService, IPageTemplate } from '../../services/page-template.service';
import { BrandComponent } from '../brand.component';
import { TemplateDialogComponent } from './pt-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
    selector: 'page-templates',
    templateUrl: './page-templates.component.html'
})

export class PageTemplatesComponent implements OnInit {
    loading: boolean = true
    templates: Array<IPageTemplate> = []
    columns: Array<string> = ['Name','Title', 'Products', 'Image Gallery', 'Show Reviews', '']


    constructor(
        private brand: BrandComponent,
        private tempService: PageTemplateService,
        private dialog: MdDialog,
        private snackBar:MdSnackBar
    ) { }

    ngOnInit() {
this.get()        
    }

    get(){
        this.tempService.get(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.templates = r
                this.loading = false
            })
    }

    openDialog(model, isNew: boolean): void {
        
        let dialogRef = this.dialog.open(TemplateDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px',
            data: { data: model, isNew: isNew, brandId: this.brand.brandId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return false

            if(result.delete){
                this.tempService.delete(result.delete.pageTemplateId)
                .do(r => console.log(r))
                    .subscribe(r => {
                        this.loading = false
                        this.get()    
                        this.snackBar.open('Successfully delete Page Template', '', { duration: 3000 })
                    })

            }

            if (!result.delete) {
                this.loading = true
                Object.assign(result, { brandId: this.brand.brandId })
                console.log(result)

                this.tempService.post(result)
                    .do(r => console.log(r))
                    .subscribe(r => {
                        this.loading = false
                        this.get()    
                        this.snackBar.open('Successfully updated Page Template', '', { duration: 3000 })
                    })
            }
        });
    }
}