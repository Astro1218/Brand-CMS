import { ContentRegionService } from '../../services/content-region.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'content-region-form',
    template:
    `
    <form [formGroup]="contentForm">
        <md-card-content>
            <md-form-field class="example-full-width" *ngIf="isAdmin">
            <input mdInput placeholder="Content Region" formControlName="contentRegion">
            </md-form-field>
            <p>
            <md-form-field class="example-full-width">
                <textarea mdInput placeholder="Description" formControlName="description"></textarea>
            </md-form-field>
            </p>
            <p>
            <md-slide-toggle class="example-margin" [color]="'accent'" formControlName="published">
                Published
            </md-slide-toggle>
            </p>
        </md-card-content>
        <md-card-actions>
            <button md-raised-button color="primary" (click)="save(contentForm.value)" [disabled]="contentForm.invalid">Save</button>
        </md-card-actions>
    </form>
    `
})

export class ContentRegionFormComponent implements OnInit {
    contentForm: FormGroup

    @Input() contentRegionId: number = 0
    @Input() brandId: number = 0
    @Output() callback = new EventEmitter()

    isAdmin = JSON.parse(localStorage.getItem('cms_auth')).isAdmin

    constructor(
        private fb: FormBuilder,
        private contentRegionService: ContentRegionService
    ) { }

    ngOnInit() {
        this.contentForm = this.fb.group({
            contentRegionId: [0],
            contentRegion: ['', Validators.required],
            description: ['', Validators.required],
            published: [false]
        })

        if (this.contentRegionId)
            this.contentRegionService.getContentRegion(this.contentRegionId)
                //.do(r => console.log(r))
                .subscribe(r => this.contentForm.patchValue(r))
    }

    save(model) {
        // save data here
        Object.assign(model, { brandId: this.brandId })
        //console.log(model)
        this.contentRegionService.insertContentRegion(model)
            //.do(r => console.log(r))
            .subscribe(r => this.callback.emit(true))

    }
}