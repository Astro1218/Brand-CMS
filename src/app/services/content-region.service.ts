import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentRegionService {
    private controller: string = 'ContentRegion/'

    constructor(
        private apiService: ApiService
    ) { }

    getContentRegion(ContentRegionId: number): Observable<Array<IContentRegion>> {
        return this.apiService.get(`${this.controller}GetContentRegion/${ContentRegionId}`)
    }

    getContentRegions(brandId: number): Observable<Array<IContentRegions>> {
        return this.apiService.get(`${this.controller}GetContentRegions/${brandId}`)
    }

    getContentRegionItems(ContentRegionId: number): Observable<Array<IContentRegionItem>> {
        return this.apiService.get(`${this.controller}GetContentRegionItems/${ContentRegionId}`)
    }

    insertContentRegion(model): Observable<Array<IContentRegionItem>> {
        return this.apiService.post(`${this.controller}InsertContentRegion`, model)
    }

    insertContentRegionItem(model): Observable<Array<IContentRegionItem>> {
        return this.apiService.post(`${this.controller}insertContentRegionItem`, model)
    }

    deleteContentRegionItem(contentRegionItemId: number) {
        return this.apiService.delete(`${this.controller}DeleteContentRegionItem/${contentRegionItemId}`)
    }

    deleteContentRegionAllItems(contentRegionId: number) {
        return this.apiService.delete(`${this.controller}DeleteContentRegionAllItems/${contentRegionId}`)
    }
}

export interface IContentRegions {
    contentRegionId: number
    brandId: number
    contentRegion: string
    description: string
    published: boolean
    cmsDateCreated: Date
    cmsDateModified: Date
    cmsModifiedBy: string
}

export interface IContentRegion {
    contentRegionId: number
    contentRegion: string
    description: string
    published: boolean
}

export interface IContentRegionItem {
    contentRegionItemId: number
    contentRegionId: number
    languageId: number
    cultureCode: string
    contentRegionItem: string
}
