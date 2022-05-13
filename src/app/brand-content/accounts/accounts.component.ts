import { Component, OnInit } from '@angular/core';
import { UserService, IUser } from '../../services/user.services';
import { BrandComponent } from '../brand.component';
import { AccountDialogComponent } from './account-dialog.component';
import { MdDialog } from '../../../../node_modules/@angular/material';

@Component({
    selector: 'accounts',
    templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit {

    keyword: string = ''
    users: Array<IUser> = []
    filtered: Array<IUser> = []

    constructor(
        private userService: UserService,
        private brand: BrandComponent,
        private dialog: MdDialog
    ) { }

    ngOnInit() {
        this.userService.get(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.users = r
                this.filtered = r.slice(0, 49)
            })
    }

    search() {
        if (this.keyword && this.keyword.length > 1) {

            this.filtered = this.users
                .filter(s => s.email.toLowerCase().includes(this.keyword.toLowerCase())).slice(0, 49)
        }
        else if (this.keyword.length == 0) {
            this.filtered = this.users.slice(0, 49)
        }
    }

    openDialog(model): void {
        let dialogRef = this.dialog.open(AccountDialogComponent, {
            data: {
                userId: model,
                brandId: this.brand.brandId
            },
            backdropClass: 'dialog-bg',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result)
            }
        });
    }
}