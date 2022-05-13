import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class CustomerFAQsService {
    private controller: string = 'ProductFAQs/'

    constructor(private apiService: ApiService) { }

    gets(brandId: number): Observable<Array<ICustomerFAQ>> {
        return this.apiService.get(`${this.controller}gets/${brandId}`)
    }

    get(productFAQId: number): Observable<ICustomerFAQ> {
        return this.apiService.get(`${this.controller}get/${productFAQId}`)
    }

    post(model) {
        return this.apiService.post(`${this.controller}post`, model)
    }
}

export interface ICustomerFAQ {
    id: Number
    modelId: Number
    modelName: String
    question: String
    answer: String
    adminApproved:  Boolean
}
