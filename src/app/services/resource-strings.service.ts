import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class ResourceStringsService {
    controller: string = 'resourcestrings/'

    constructor(private apiService: ApiService) { }

    getKeys(brandId:number): Observable<Array<IRSKey>> {
        return this.apiService.get(`${this.controller}GetKeys/${brandId}`)
    }

    insertKeyValue(model) {
        return this.apiService.post(`${this.controller}InsertKeyValue`, model)
    }

    insertValueOverride(model) {
        return this.apiService.post(`${this.controller}insertValueOverride`, model)
    }
}

export interface IRSKey {
	resourceStringKeyId: number
	key: string
	genericValueId: number
	genericValue: string
	overrideValueId: any
	override_Value: any
	brandId: any
	cmsActive: boolean
	language: string
}
