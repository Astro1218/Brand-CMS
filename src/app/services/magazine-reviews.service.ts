import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class MagazineReviewsService {
	controller: string = 'magazineReviews/'

	constructor(private apiService: ApiService) { }

	get(brandId: number): Observable<Array<IProductMagazineReview>> {
		return this.apiService.get(`${this.controller}get/${brandId}`)
	}

	post(model: any): Observable<any> {
		return this.apiService.post(`${this.controller}post`, model)
	}

	getItem(mainCatGuideId: number): Observable<Array<IProductMagazineReviewItem>> {
		return this.apiService.get(`${this.controller}getItem/${mainCatGuideId}`)
	}

	postItem(formData: FormData): Observable<any> {
		return this.apiService.post(`${this.controller}postItem`, formData)
	}

	delete(productMagazineReviewId: number): Observable<any> {
		return this.apiService.delete(`${this.controller}delete?productMagazineReviewId=${productMagazineReviewId}`)
	}

	deletePdf(formData: FormData): Observable<any> {
		return this.apiService.post(`${this.controller}deletePdf`, formData)
	}
}

export interface IProductMagazineReviewItem {
	imageGalleryItemId: number
	imageUrl: string
	imageTitle: string
	imageDescription: string
	productMagazineReviewItemId: number
	title: string
	pdfURL: number
	showHeadline: boolean
	details: string
	cmsActive: boolean
	cmsModifiedBy: string
	files: any
	dateFrom: any
	dateTo: any
	imageItemActive: boolean

}

export interface IProductMagazineReview {
	productMagazineReviewId: number
	brandId: number
	imageGalleryId: number
	imageGalleryName: string
	productSKU: number
	cmsOrder: number
	cmsActive: boolean
	cmsDateCreated: Date
	cmsModifiedDate: Date
	cmsModifiedBy: string
}
