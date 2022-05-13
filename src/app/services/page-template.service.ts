import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class PageTemplateService {
    controller: string = 'pageTemplate/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<Array<IPageTemplate>> {
        return this.apiService.get(`${this.controller}${brandId}`)
    }

    post( model: any): Observable<any> {
        return this.apiService.post(`${this.controller}`, model)
    }

    delete(pageTemplateId:number): Observable<any> {
        return this.apiService.delete(`${this.controller}${pageTemplateId}`)
    }
}

export interface IPageTemplate {
	pageTemplateId: number
    imageGalleryId: number
    imageGalleryName: string
	title: string
	products: string
    showReviews: boolean
    pageTemplateName:string
}