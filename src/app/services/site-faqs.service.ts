import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class SiteFAQsService {
    private controller: string = 'SiteFAQs/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<Array<ISiteFAQ>> {
        return this.apiService.get(`${this.controller}${brandId}`)
    }

    post(model) {
        return this.apiService.post(`${this.controller}`, model)
    }
}

export interface ISiteFAQ {
    siteFAQId: number
	brandId: number
	question: string
	answer: string
	modifiedBy: string
	cmsActive: number
}
