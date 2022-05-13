import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'error-status',
    template:
    `
    <div class="row">
    <div class="col-md-12" *ngIf="error">
        <md-card style="background-color:#e74c3c;">
            <md-card-title style="color:#fff;">{{error?.statusText}}</md-card-title>
            <md-card-subtitle style="color:#fff;">{{getReason(error)}}</md-card-subtitle>
            <md-card-content style="color:#fff;">
                Error: {{error?.error || '//'}}
                <br>
                Message: {{error?.message || '//'}}
                <br>
                Name: {{error?.name || '//'}}
                <br>
                URL: {{error?.url || '//'}}
            </md-card-content>
        </md-card>
    </div>
    </div>
    `
})

export class ErrorStatusComponent implements OnInit {
    @Input() error: any
    reason: string = ''

    constructor() { }

    ngOnInit() { }

    getReason(error: any): string {
        switch (error.status) {
            case 401:
                this.reason = 'You are NOT authorised.'
                break;
            case 403:
                this.reason = 'You are authorised but do NOT have access to this page.'
                break;
            default:
                this.reason = 'No reason stored.'
                break;
        }

        return `(${error.status}) ${this.reason}`
    }
}