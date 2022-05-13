import { IModel, ModelService } from '../../services/model.service';
import { Component, OnInit, Inject } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
    selector: 'models-dialog',
    templateUrl: './models-dialog.component.html',
})
export class ModelsDialogComponent implements OnInit {
    model: IModel
    modelForm: FormGroup

    constructor(
        public dialogRef: MdDialogRef<ModelsDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private modelService: ModelService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.modelForm = this.fb.group({
            modelId: [0],
            cmsActiveOverride: []
        })

        this.modelForm.patchValue(this.data)
    }
}
