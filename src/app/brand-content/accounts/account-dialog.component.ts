import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/user.services';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';

@Component({
    selector: 'account-dialog',
    templateUrl: './account-dialog.component.html'
})

export class AccountDialogComponent implements OnInit {

    form: FormGroup

    constructor(
        public dialogRef: MdDialogRef<AccountDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private userService: UserService,
        private fb: FormBuilder
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.form = this.fb.group({
            id:[''],
            title:['', [Validators.required, Validators.minLength(2)]],
            firstName:['', Validators.required],
            lastName:['', Validators.required],
            address1:['', Validators.required],
            address2:[''],
            city:['', Validators.required],
            county:['', Validators.required],
            country:['', Validators.required],
            postCode:['', Validators.required],
            email:['', [Validators.required, Validators.pattern(this.emailRegex())]],
            emailConfirmed:[false],
            isActive:[false],
            optIn:[false],
            createdDate:[''],
            aboutYouId:[0],
            ageId:[0],
        })

        this.userService.getUser(this.data.brandId, this.data.userId)
        .do(r => console.log(r))
        .subscribe(r => {
            this.form.patchValue(r);
            this.form.disable();
            
        })
    }

    emailRegex(){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
}