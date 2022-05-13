import { StockistDialogComponent } from './stockist-dialog.component'
import { BrandComponent } from '../brand.component'
import { ActivatedRoute } from '@angular/router'
import { StockistService, IStockists, IStockist } from '../../services/stockist.services'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material'
import { environment } from '../../../environments/environment';

@Component({
    selector: 'stockists',
    templateUrl: './stockists.component.html'
})

export class StockistsComponent implements OnInit {
    columns: Array<string> = ['Stockist Name', 'Stockist Type', '', '']
    stockists: Array<IStockists> = []
    data: Array<IStockists> = []
    keyword: string = ''
    loading: boolean = true
    toggle

    constructor(
        private stockistService: StockistService,
        private route: ActivatedRoute,
        private brandComponent: BrandComponent,
        private dialog: MdDialog,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        this.getStockist(this.brandComponent.brandId)
    }

    getStockist(brandId) {
        this.stockistService.getStockists(brandId)
            .subscribe(r => {
                this.loading = false
                this.data = r
            })
    }

    openDialog(model: IStockists, isNew: boolean) {
        let dialogRef = this.dialog.open(StockistDialogComponent, {
            data: { data: model, isNew: isNew, brand: this.brandComponent },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe((result) => {
                if (!result) {
                    return false
                }

                if (result.reload) {
                    this.getStockist(this.brandComponent.brandId)
                    this.showAll(false)
                    this.toggle = false
                }

                if (result.delete) {
                    this.delete(result)
                }
            })
    }

    delete(result) {
        this.stockistService.deleteStockist(result.stockistId)
            .subscribe(r => {
                this.snack.open('Stockist deleted', '', { duration: 4000 })
                this.getStockist(this.brandComponent.brandId)
                this.showAll(false)
                this.toggle = false
            });
    }

    showAll(flag: boolean) {
        if (flag) {
            this.stockists = this.data
            this.loading = false
        } else {
            this.stockists = []
        }
    }

    search(keyword: string) {
        if (keyword && keyword.length > 3) {
            this.stockists = this.data
                .filter(s => s.stockistName.toLowerCase().indexOf(keyword.toLowerCase()) === 0)
        }
        else {
            this.stockists = []
        }
    }

    export() {
      window.open(`${environment.api_url}stockist/getExport?brandName=${this.brandComponent.brand}`, '_self', '', null)
  }
}
