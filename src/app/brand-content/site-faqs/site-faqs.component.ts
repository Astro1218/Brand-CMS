import { Component, OnInit } from '@angular/core';
import { BrandComponent } from '../brand.component';
import { ISiteFAQ, SiteFAQsService } from '../../services/site-faqs.service';
import { MdDialog, MdSnackBar } from '@angular/material';
import { SiteFAQDialogComponent } from './site-faq-dialog.component';

@Component({
    selector: 'site-faqs',
    templateUrl: './site-faqs.component.html'
})

export class SiteFAQsComponent implements OnInit {
    faqs: Array<ISiteFAQ> = []

    constructor(
        private brandComponent: BrandComponent,
        private siteFaqsService: SiteFAQsService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get(){
        this.siteFaqsService.get(this.brandComponent.brandId)
        .do(r => console.log(r))
        .subscribe(r => this.faqs = r)
    }

    openDialog(model: ISiteFAQ, isNew: boolean) {
        const dialogRef = this.dialog.open(SiteFAQDialogComponent, {
            data: { data: model, isNew: isNew },
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: ISiteFAQ) => {
                if (result) {
                    result.brandId = this.brandComponent.brandId
                    console.log(result)
                    this.siteFaqsService.post(result)
                        .subscribe(r => {
                            this.get()
                            this.snackBar.open('FAQ Updated', '', { duration: 3000 })
                        })
                }
            })
    }
}