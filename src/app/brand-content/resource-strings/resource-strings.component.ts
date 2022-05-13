import { CommonService } from '../../services/common.service';
import { BrandComponent } from '../brand.component';
import { Component, OnInit } from '@angular/core';
import { ResourceStringsService, IRSKey } from '../../services/resource-strings.service';
import { ResourceStringDialogComponent } from './rs-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';

@Component({
    selector: 'resource-strings',
    templateUrl: './resource-strings.component.html'
})

export class ResourceStringsComponent implements OnInit {
    term
    loading: boolean = true
    columns: Array<string> = ['Key', 'Value']
    keys: Array<IRSKey> = []
    filteredKeys: Array<IRSKey> = []


    constructor(
        private resourceStringsService: ResourceStringsService,
        private brand: BrandComponent,
        private common: CommonService,
        private dialog: MdDialog,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get() {
        this.resourceStringsService.getKeys(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.keys = r
                this.filteredKeys = this.keys.filter(x => x.override_Value)
            })
    }

    search(term) {
        if (term.length > 3) {

            term = term.toLowerCase()

            this.filteredKeys = this.keys.filter(x => {
                let override = x.override_Value || '';
                return x.key.toLowerCase().includes(term) || override.toLowerCase().includes(term)
            })
        } else {
            this.filteredKeys = this.keys
        }
    }

    openDialog(model, isNew: boolean) {
        const dialogRef = this.dialog.open(ResourceStringDialogComponent, {
            data: { data: model, isNew: isNew },
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result) {
                    return false
                }
                Object.assign(result, { brandId: this.brand.brandId, resourceStringValueOverrideId: result.overrideValueId })
                console.log(result)

                this.resourceStringsService.insertValueOverride(result)
                .do(r => console.log(r))
                .subscribe(r => {
                    this.snack.open('Successfully added new Override Value', '', { duration: 3000 })
                    this.get()
                })

            })
    }
}