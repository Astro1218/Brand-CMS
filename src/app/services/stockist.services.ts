import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class StockistService {
    controller: string = 'stockist/'

    constructor(private apiService: ApiService) { }

    getStockistType(): Observable<Array<IStockistType>> {
        return this.apiService.get(`${this.controller}GetStockistType`)
    }

    getStockists(brandId: number): Observable<Array<IStockists>> {
        return this.apiService.get(`${this.controller}get?brandid=${brandId}`)
    }

    getStockist(stockistId: number): Observable<IStockist> {
        return this.apiService.get(`${this.controller}GetStockist?StockistId=${stockistId}`)
    }

    getStockistLanguageIndex(stockistId: number): Observable<Array<IStockistLanguageIndex>> {
        return this.apiService.get(`${this.controller}GetStockistLanguageIndex?StockistId=${stockistId}`)
    }

    insertStockist(model) {
        return this.apiService.post(`${this.controller}InsertStockist`, model)
    }

    insertStockistLanguageIndex(model) {
        return this.apiService.post(`${this.controller}InsertStockistLanguageIndex`, model)
    }

    updateCoordinates(model) {
        return this.apiService.put(`${this.controller}updateCoordinates`, model)
    }

    deleteStockist(stockistId: number) {
        return this.apiService.delete(`${this.controller}delete/${stockistId}`)
    }

    deleteStockistLogo(stockistId){
        return this.apiService.delete(`${this.controller}DeleteStockistLogo/${stockistId}`)
    }
}

export interface IStockists {
    stockistId: number
    stockistTypeId: number
    stockistType: string
    stockistName: string
    cmsActive: boolean
}

export interface IStockist extends IStockists {
    brandId: number
    address1: string
    address2: string
    city: string
    mapCountyId: number
    mapRegionId: number
    mapRegion: string
    county: string
    country: string
    postCode: string
    latitude: number
    longitude: number
    imageFilename: string
    telephone: string
    webURL: string
    isPremierStockist: boolean
}

export interface IStockistLanguageIndex {
    cultureCode: string
    languageId: number
    cmsActive: number
}

export interface ILanguages {
    cultureCode: string
    languageId: number
}

export interface IStockistType {
    stockistType: string
    stockistTypeId: number
}
