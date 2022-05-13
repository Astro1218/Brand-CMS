import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentCollectionService {
    private controller: string = 'ContentCollection/'

    constructor(private apiService: ApiService) { }

    getTypes(): Observable<Array<IContentCollectionTypes>> {
        return this.apiService.get(`${this.controller}GetTypes`)
    }

    getTypesByBrand(brandId: number): Observable<Array<IContentCollectionTypes>> {
        return this.apiService.get(`${this.controller}GetTypesByBrand/${brandId}`)
    }

    getContentCollections(brandId: number): Observable<IContentCollectionCombi> {
        return this.apiService.get(`${this.controller}GetContentCollections/${brandId}`)
    }

    getItems(contentCollectionId: number): Observable<Array<IContentCollectionItem>> {
        return this.apiService.get(`${this.controller}GetItems/${contentCollectionId}`)
    }

    getContentCollection(contentCollectionId: number): Observable<IContentCollection> {
        return this.apiService.get(`${this.controller}GetContentCollection/${contentCollectionId}`)
    }

    insert(model) {
        return this.apiService.post(`${this.controller}Insert`, model)
    }

    insertItem(model) {
        return this.apiService.post(`${this.controller}InsertItem`, model)
    }

    sort(collection: Array<any>) {
        return this.apiService.put(`${this.controller}Sort`, collection)
    }

    delete(contentCollectionId: number) {
        return this.apiService.delete(`${this.controller}Delete/${contentCollectionId}`)
    }
}

export interface IContentCollectionCombi {
    collections: Array<IContentCollection>
    types: Array<IContentCollectionTypes>
}

export interface IContentCollectionTypes {
    contentCollectionTypeId: number
    contentCollectionType: string
}

export interface IContentCollection {
    contentCollectionId: number
    contentCollectionTypeId: number
    contentCollectionType: string
    title: string
    details: string
    showHeadline: boolean
    altTag: string
    imageFilename: string
    urLtoLinkTo: string
    publishStartDate: Date
    publishEndDate: Date
    cmsActive: boolean
    cmsOrder: number
    //cultureCode: string
}

export interface IContentCollectionItem {
    contentCollectionId: number
    languageId: number
    cultureCode: string
    title: string
    details: string
    cultureImageFilename: string
    altTag: any
}
