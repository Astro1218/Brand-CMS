import { Component, OnInit } from '@angular/core'
import { ICustomerFAQ, CustomerFAQsService } from '../../services/customer-faqs.service'
import { MdDialog, MdSnackBar } from '@angular/material'
import { BrandComponent } from '../brand.component'
import { FAQDialogComponent } from './faqs-dialog.component'

@Component({
    selector: 'customer-faqs',
    templateUrl: './customer-faqs.component.html'
})

export class CustomerFAQsComponent implements OnInit {
    columns: Array<string> = ['Model', 'Question', '']
    list: Array<ICustomerFAQ> = []
    loading: boolean = true

    constructor(
        private brandComponent: BrandComponent,
        private customerFAQsService: CustomerFAQsService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {

        this.customerFAQsService.gets(this.brandComponent.brandId)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.list = r
                this.loading = false
            })
    }

    snackMe(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        })
    }

    openDialog(model: ICustomerFAQ) {
        const dialogRef = this.dialog.open(FAQDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: ICustomerFAQ) => {
                if (result) {
                    Object.assign(result, { productFAQId: result.id })
                    this.customerFAQsService.post(result)
                        //.do(r => console.log(r))
                        .subscribe(r => {
                            // update approved row
                            var faq = this.list.find(f => f.id === result.id)

                            faq.adminApproved = result.adminApproved
                            faq.answer = result.answer
                            faq.question = result.question

                            this.snackMe('FAQ Updated', '')
                        })
                }
            })
    }
}
