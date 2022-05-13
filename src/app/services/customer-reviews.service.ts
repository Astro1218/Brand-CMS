import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class CustomerReviewsService {
    private controller: string = 'CustomerReviews/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<Array<ICustomerReviews>> {
        return this.apiService.get(`${this.controller}/get?brandId=${brandId}`)
    }

    put(model) {
        return this.apiService.put(`${this.controller}put`, model)
    }
}

export interface ICustomerReviews {
    customerReviewId: Number
    modelName: String
    primaryDescription: String
    modelId: number
    customerUserName: String
    customerEmail: String
    reviewTitle: String
    reviewComments: String
    rating: number
    adminComment: string
    adminApproved: Boolean
    adminReviewed: Boolean
    dateCreated: Date
}
