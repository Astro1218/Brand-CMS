import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class ProductGuideService {
    controller: string = 'productGuide/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<Array<IProductGuide>> {
        return this.apiService.get(`${this.controller}get/${brandId}`)
    }

    post( model: any): Observable<any> {
        return this.apiService.post(`${this.controller}post`, model)
    }

    getItem(mainCatGuideId: number): Observable<Array<IProductGuideItem>> {
        return this.apiService.get(`${this.controller}getItem/${mainCatGuideId}`)
    }

    postItem( model: any): Observable<any> {
        return this.apiService.post(`${this.controller}postItem`, model)
	}
	
	delete(mainCatGuideId: number): Observable<any> {
		return this.apiService.delete(`${this.controller}delete?mainCatGuideId=${mainCatGuideId}`)
	}
}

export interface IProductGuide {
	mainCatGuideId: number
	imageGalleryId: number
	brandId: number
	mainCategoryId: number
	mainCategory: string
	cmsActive: boolean
	cmsModifiedBy: string
}

export interface IProductGuideItem {
	imageGalleryItemId: number
	imageUrl: string
	imageTitle: string
	imageDescription: string
	mainCatGuideItemId: number
	title: string
	description: string
	cmsActive: boolean
	cmsDateModified: Date
	dateFrom: any
	dateTo: any
	imageItemActive: boolean
}