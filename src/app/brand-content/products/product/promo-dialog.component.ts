import { ProductService } from '../../../services/product.service'
import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material'

@Component({
    selector: 'promo-video-dialog',
    templateUrl: './promo-dialog.component.html'
})

export class PromoVideoDialogComponent implements OnInit {
    promoForm: FormGroup
    columns: Array<string> = ['promoVideoFilename', 'videoName', '', '']
    videos: Array<any> = []
    types: Array<any> = []
    loading: boolean = true

    constructor(
        public dialogRef: MdDialogRef<PromoVideoDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private productService: ProductService,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        console.log('data', this.data)
        this.getVideos(this.data.productId)

        this.productService.getPromoVideoTypes()
            .do(r => console.log(r))
            .subscribe(r => {
                this.types = r
            })

        this.promoForm = this.fb.group({
            productPromoVideoId: [0],
            productId: [0],
            promoVideoFilename: ['', Validators.required],
            videoName: ['', Validators.required],
            cmsOrder: [0]
        })

        this.clear()
    }

    getVideos(productId) {
        this.productService.getPromoVideo(productId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.videos = r
                this.loading = false
            })
    }

    add(model) {
        if (this.promoForm.valid)
            this.productService.InsertPromoVideo(model)
                .do(r => console.log(r))
                .subscribe(r => {
                    this.getVideos(this.data.productId)
                    this.clear()
                    this.snackBar.open('Successfully completed', '', { duration: 3000 })
                })
    }

    edit(model) {
        this.promoForm.patchValue(model)
    }

    clear() {
        this.promoForm.reset()

        var formModel = {
            productPromoVideoId: 0,
            productId: this.data.productId,
            cmsOrder: 0
        }

        this.promoForm.patchValue(formModel)
    }

    delete(model) {
        if (confirm('Are you sure you want to delete this promo video link?')) {
            this.productService.deletePromoVideo(model.productPromoVideoId)
                .do(r => console.log(r))
                .subscribe(r => {
                    var index = this.videos.findIndex(vid => vid.productPromoVideoId === model.productPromoVideoId)
                    this.videos.splice(index, 1)

                    this.snackBar.open('Successfully delete link', '', { duration: 3000 })
                    this.clear()
                })
        }
    }
}