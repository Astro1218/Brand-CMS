import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class UserService {
    private controller: string = 'user/'

    constructor(private apiService: ApiService) { }

    get(brandId: number): Observable<Array<IUser>> {
        return this.apiService.get(`${this.controller}get?brandId=${brandId}`)
	}

	getUser(brandId: number, userId:string): Observable<IUser> {
        return this.apiService.get(`${this.controller}getUser?brandId=${brandId}&userId=${userId}`)
    }
}

export interface IUser {
	id: string
	brandId: number
	ageId: number
	aboutYouId: number
	email: string
	emailConfirmed: boolean
	isActive: boolean
	title: string
	firstName: string
	lastName: string
	address1: string
	address2: string
	city: string
	county: string
	country: string
	postCode: number
	optIn: boolean
	createdDate: Date
}
