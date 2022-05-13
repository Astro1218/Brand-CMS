import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class ModelService {
    controller: string = 'model/'

    constructor(private apiService: ApiService) { }

    getModels(brandId: number): Observable<Array<IModel>> {
        return this.apiService.get(`${this.controller}${brandId}`)
    }

    updateModel(modelId: number, model: any): Observable<Array<IModel>> {
        return this.apiService.put(`${this.controller}${modelId}`, model)
    }
}

export interface IModel {
    modelId: number
    modelName: string
    cmsActive: boolean
    cmsActiveOverride: boolean
}
