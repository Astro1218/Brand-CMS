import { BrandComponent } from '../brand.component'
import { CustomerReviewsService, ICustomerReviews } from '../../services/customer-reviews.service'
import { Component, OnInit } from '@angular/core'
import { ReviewDialogComponent } from './review-dialog.component'
import { MdDialog, MdSnackBar } from '@angular/material'
import { environment } from '../../../environments/environment';

@Component({
    selector: 'customer-reviews',
    templateUrl: './customer-reviews.component.html'
})

export class CustomerReviewsComponent implements OnInit {
    columns: Array<string> = ['Title', 'Model', 'Rating', 'Customer', 'Date Created', '', '', '']
    list: Array<ICustomerReviews> = []
    list2: Array<ICustomerReviews> = []
    loading: boolean = true

    // filter
    selected_rate = ''
    ratings = [1, 2, 3, 4, 5]

    constructor(
        private brandComponent: BrandComponent,
        private customerReviewsService: CustomerReviewsService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get() {
        this.customerReviewsService.get(this.brandComponent.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.list = []
                this.list2 = r

                this.filterResult(1);
                this.loading = false
            })
    }

    export() {
        window.open(`${environment.api_url}CustomerReviews/getCsv?brandId=${this.brandComponent.brandId}&brandName=${this.brandComponent.brand}`, '_self', '', null)
    }

    filterRating(rating) {
        this.list = []
        if (!rating) {
            Object.assign(this.list, this.list2)
            this.list = this.list.splice(0, 250)
        }
        else {
            Object.assign(this.list, this.list2)
            this.list = this.list.filter(x => x.rating == rating)
        }
    }

    filterResult(type) {
        this.loading = true
        this.list = []
        switch (type) {
            case 1:
                Object.assign(this.list, this.list2);
                this.list = this.list.splice(0, 250)
                this.loading = false
                break;
            case 2:
                Object.assign(this.list, this.list2);
                this.list = this.list.filter(x => x.adminReviewed == true && x.adminApproved == false)
                this.loading = false
                break;
            case 3:
                Object.assign(this.list, this.list2);
                this.list = this.list.filter(x => x.adminReviewed == false)
                this.loading = false
                break;
            case 4:
                setTimeout(() => {
                    Object.assign(this.list, this.list2);
                    this.list = this.list
                    this.loading = false
                }, 1000);
                break;
        }
    }

    openDialog(model: ICustomerReviews) {
        let dialogRef = this.dialog.open(ReviewDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                  this.approve(result.result, result.approved)
                }
            })
    }

    approve(result, approved) {
        result.adminApproved = approved
        result.adminReviewed = true

        this.customerReviewsService.put(result)
            .subscribe(r => {
                this.snackBar.open(approved ? 'Review Approved' : 'Review Unapproved', '', { duration: 3000 })

                // update approved row
                // var review = this.list.find(x => x.customerReviewId === result.customerReviewId)
                // review.adminApproved = true
                // review.adminComment = result.adminComment

                this.get()
            }, e => {
                this.snackBar.open('Error :(', '', { duration: 3000 })
            })
    }
}
