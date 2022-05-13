import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class DashboardService {
    private controller: string = 'dashboard/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<IDashboard> {
        return this.apiService.get(`${this.controller}${brandId}`)
    }

    search(brandId: number, searchString: string): Observable<Array<ISearch>> {
        return this.apiService.get(`${this.controller}search/${brandId}/${searchString}`)
    }
}

export interface IDashboard {
    reviewsAwaitingApproval: number
    productCount: number
    activeProductCount: number
    registeredProducts: number
    registeredSince: Date
}

export interface ISearch {
	productId: number
	regionCode: string
	subCategoryId: number
	modelName: string
	productSKU: number
	primaryDescription: string
	secondaryDescription: string
	featuredProductActive: boolean
	// cmsOrder: number
	// displayOrder: number
	cmsActive: boolean
	cmsActiveOverride: any
	hasImage: boolean
}