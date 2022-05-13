import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class MapService {
    controller: string = 'map/'

    constructor(private apiService: ApiService) { }

    getRegions(): Observable<Array<IRegion>> {
        return this.apiService.get(`${this.controller}getRegions`)
    }

    getRegion(mapRegionId: number): Observable<Array<IRegion>> {
        return this.apiService.get(`${this.controller}getRegion/${mapRegionId}`)
    }

    getCounties(): Observable<Array<ICounty>> {
        return this.apiService.get(`${this.controller}getCounties`)
    }

    getCounty(mapCountyId: number): Observable<Array<ICounty>> {
        return this.apiService.get(`${this.controller}getCounty/${mapCountyId}`)
    }

    getCountiesByRegion(mapRegionId: number): Observable<Array<ICounty>> {
        return this.apiService.get(`${this.controller}GetCountiesByRegion/${mapRegionId}`)
    }


    // updateModel(modelId: number, model: any): Observable<Array<IModel>> {
    //     return this.apiService.put(`${this.controller}${modelId}`, model)
    // }
}

export interface ICounty {
    mapCountyId: number
    mapCounty: string
}

export interface IRegion {
    mapRegionId: number
    mapRegion: string
    cmsActive: boolean
}
