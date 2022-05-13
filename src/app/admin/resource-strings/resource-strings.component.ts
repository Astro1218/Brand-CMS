import { Component, OnInit } from '@angular/core';
import { ResourceStringsService, IRSKey } from '../../services/resource-strings.service';
import { MdDialog, MdSnackBar } from '@angular/material';
import { KeyValueDialogComponent } from './keyvalue.dialog.component';

@Component({
    selector: 'admin-resource-strings',
    templateUrl: './resource-strings.component.html'
})

export class AdminResourceStringsComponent implements OnInit {
    term
    keys: Array<IRSKey> = []
    filteredKeys: Array<IRSKey> = []

    constructor(
        private rsService: ResourceStringsService,
        private dialog: MdDialog,
        private snack: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    get() {
        this.rsService.getKeys(0)
            .do(r => console.log(r))
            .subscribe(r => {
                this.keys = r
                this.filteredKeys = this.keys
            })
    }

    search(term) {
        if (term.length > 3) {
            this.filteredKeys = this.keys.filter(x => x.key.toLowerCase().includes(term.toLowerCase()))
        } else {
            this.filteredKeys = this.keys
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(KeyValueDialogComponent, {
            backdropClass: 'dialog-bg',
            width: '600px'
        })

        dialogRef.afterClosed()
            .subscribe(result => {
                if (!result) {
                    return false
                }

                this.rsService.insertKeyValue(result).subscribe(r => {
                    this.snack.open('Successfully added new Key / Value', '', { duration: 3000 })
                    this.get()
                })
            })
    }
}