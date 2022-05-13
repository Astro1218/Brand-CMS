import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class AdminService {
    controller: string = 'admin/'

    constructor(private apiService: ApiService) { }

    getBrands(): Observable<Array<IBrands>> {
        return this.apiService.get(`${this.controller}get`)
    }

    getBrandById(brandId: number): Observable<IBrandCollection> {
        return this.apiService.get(`${this.controller}get/${brandId}`)
    }

    getBrandLanguageIndex(brandId: number): Observable<any> {
        return this.apiService.get(`${this.controller}getBrandLanguageIndex/${brandId}`)
    }

    insertBrand(model) {
        return this.apiService.post(`${this.controller}post`, model)
    }

    insertSiteNavigation(model) {
        return this.apiService.put(`${this.controller}put/${model.brandId}`, model)
    }

    insertSiteSetting(model) {
        return this.apiService.post(`${this.controller}InsertSiteSetting`, model)
    }

    insertBrandLanguageIndex(model) {
        return this.apiService.post(`${this.controller}insertBrandLanguageIndex`, model)
    }

    deleteSiteSetting(siteSettingId: number) {
        return this.apiService.delete(`${this.controller}delete/${siteSettingId}`, )
    }

    deleteBrandImage(brandId: number) {
        return this.apiService.delete(`${this.controller}deleteBrandImage/${brandId}`, )
    }
}

interface IBrandCollection {
    brand: IBrand
    nav: Array<ISiteNavigation>
    settings: Array<ISiteSettings>
    feature: Array<IFeatureProductLevel>
}

export interface IBrands {
    brand: string
    brandId: number
    brandImage: string
    cmsActive: boolean
    adGroup: string
}

export interface ISiteNavigation {
    siteNavigationId: number
    siteNavigation: string
    cmsActive: boolean
}

export interface IBrand {
    brand: string
    brandId: number
    brandImage: string
    adGroup: string
    cmsActive: boolean
    cmsDateCreated: Date
    cmsDateModified: Date
    cmsModifiedBy: string
}

export interface ISiteSettings {
    siteSettingId: number
    name: string
    value: string
    description: string
}

export interface IFeatureProductLevel {
    featuredProductDisplayLevelId: number
    featuredProductDisplayLevel: string
}

export interface IFeatureProduct {
    cmsOrder: number
    featuredProductDisplayLevel: string
    productId: number
    productSKU: string
}
