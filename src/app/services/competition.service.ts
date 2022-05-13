import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class CompetitionService {
	controller: string = 'competition/'

	constructor(private apiService: ApiService) { }

	get(brandId: number): Observable<Array<ICompetition>> {
		return this.apiService.get(`${this.controller}get/${brandId}`)
	}

	post(model: any): Observable<any> {
		return this.apiService.post(`${this.controller}post`, model)
  }

  sortCompetition(array: any): Observable<any> {
		return this.apiService.put(`${this.controller}sortCompetition`, array)
	}

	getItem(competitionId: number): Observable<Array<ICompetitionItem>> {
		return this.apiService.get(`${this.controller}getItem/${competitionId}`)
	}

	postItem(formData: FormData): Observable<any> {
		return this.apiService.post(`${this.controller}postItem`, formData)
	}

	delete(competitionId: number): Observable<any> {
		return this.apiService.delete(`${this.controller}delete?competitionId=${competitionId}`)
	}

	deletePdf(formData: FormData): Observable<any> {
		return this.apiService.post(`${this.controller}deletePdf`, formData)
	}
}

export interface ICompetitionItem {
	imageGalleryItemId: number
	imageUrl: string
	imageTitle: string
	imageDescription: string
	competitionItemId: number
	title: string
	pdfURL: number
	details: string
	cmsActive: boolean
	cmsModifiedBy: string
	files: any
	dateFrom: any
	dateTo: any
	imageItemActive: boolean
}

export interface ICompetition {
	competitionId: number
	competitionName: string
	brandId: number
	imageGalleryId: number
	imageGalleryName: string
	cmsOrder: number
	cmsActive: boolean
	cmsDateCreated: Date
	cmsModifiedDate: Date
	cmsModifiedBy: string
	cultureCode: string
}
