import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class CommonService {
    controller: string = 'common/'

    constructor(private apiService: ApiService) { }

    getNavigation(brandId: number): Observable<Array<INavigation>> {
        return this.apiService.get(`${this.controller}getSiteNavigation/${brandId}`)
    }

    getLanguageCountries(): Observable<Array<ILanguageCountries>> {
        return this.apiService.get(`${this.controller}getLanguageCountries`)
    }
    
    getLanguages(): Observable<Array<ILanguages>> {
        return this.apiService.get(`${this.controller}getLanguages`)
    }
}

export interface INavigation {
    siteNavigation: string
}

export interface ILanguageCountries {
    languageId: number
    languageCountry: string
}

export interface ILanguages {
	languageId: number
	cultureCode: string
}