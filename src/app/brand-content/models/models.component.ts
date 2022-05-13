import { BrandComponent } from '../brand.component';
import { ModelService, IModel } from '../../services/model.service';
import { Component, OnInit } from '@angular/core';
import { ModelsDialogComponent } from "./models-dialog.component";
import { MdDialog, MdSnackBar } from "@angular/material";

@Component({
    selector: 'models',
    templateUrl: './models.component.html'
})

export class ModelsComponent implements OnInit {
    columns: Array<string> = ['Model Name', 'PBX Active', 'CMS Active Override', 'Primary Image', 'SAGE Active', '']
    models: Array<IModel> = []
    list: Array<IModel> = []
    loading: boolean = true
    keyword: string = ''

    constructor(
        private modelService: ModelService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.modelService.getModels(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => {
                this.models = r
                this.loading = false
            })

        this.list = this.models
    }

    search(keyword: string) {
        if (keyword && keyword.length > 1) {

            this.list = this.models
                .filter(s => s.modelName.toLowerCase().indexOf(keyword.toLowerCase()) === 0)
        }
        else {
            this.list = []
        }
    }

    edit(model) {
        let dialogRef = this.dialog.open(ModelsDialogComponent, {
            data: model,
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: IModel) => {
                if (result) {
                    this.modelService.updateModel(result.modelId, result)
                        .do(r => console.log(r))
                        .subscribe(r => {
                            this.snackBar.open('Model updated', '', {
                                duration: 3000,
                            })

                            // update approved row
                            var model = this.list.find(x => x.modelId === result.modelId)
                            model.cmsActiveOverride = result.cmsActiveOverride

                            if(result.cmsActiveOverride !== null){
                                model.cmsActive = result.cmsActiveOverride
                            }
    
                        })
                }
            })
    }
}