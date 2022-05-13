import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'authentication',
    template:
    `
    <p style="color:red; text-align:center;">
    <i class="fa fa-warning"></i> You do NOT have permission to access this page.
    </p>
    <p style="text-align:center;">
    <a md-raised-button [routerLink]="['']">Return to Brand Selection</a>
    </p>
    `
})

export class AuthenticationComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}