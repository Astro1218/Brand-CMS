import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class ProductService {
    private controller: string = 'product/'

    constructor(private apiService: ApiService) { }

    getMainCategories(brandId: number): Observable<Array<IMainCategory>> {
        return this.apiService.get(`${this.controller}getMainCategories/${brandId}`)
    }

    getSubCategoriesForMainCategory(brandId: number, mainCategoryId: number): Observable<Array<ISubCategory>> {
        return this.apiService.get(`${this.controller}getSubCategoriesForMainCategory/${brandId}/${mainCategoryId}`)
    }

    getProductsForMainCategory(brandId: number, mainCategoryId: number): Observable<Array<IProduct>> {
        return this.apiService.get(`${this.controller}getProductsForMainCategory/${brandId}/${mainCategoryId}`)
    }

    getProductsForSubCategory(brandId: number, subCategoryId: number): Observable<Array<IProduct>> {
        return this.apiService.get(`${this.controller}getProductsForSubCategory/${brandId}/${subCategoryId}`)
    }

    getFeaturedProducts(brandId: number): Observable<Array<IFeaturedProduct>> {
        return this.apiService.get(`${this.controller}getFeaturedProducts/${brandId}`)
    }

    getPromoVideo(productId: number): Observable<Array<IPromoVideo>> {
        return this.apiService.get(`${this.controller}getPromoVideo/${productId}`)
    }

    getPromoVideoTypes(): Observable<Array<string>> {
        return this.apiService.get(`${this.controller}getPromoVideoTypes`)
    }

    InsertPromoVideo(model) {
        return this.apiService.post(`${this.controller}insertPromoVideo`, model)
    }

    sortMainCategory(brandId: number, vm: Array<any>) {
        return this.apiService.put(`${this.controller}SortMainCategory/${brandId}`, vm)
    }

    updateMainCategory(brandId: number, vm: any) {
        return this.apiService.put(`${this.controller}UpdateMainCategory/${brandId}`, vm)
    }

    sortSubCategory(brandId: number, vm: Array<any>) {
        return this.apiService.put(`${this.controller}SortSubCategory/${brandId}`, vm)
    }

    updateSubCategory(brandId: number, vm: any) {
        return this.apiService.put(`${this.controller}UpdateSubCategory/${brandId}`, vm)
    }

    sortProduct(vm: Array<any>) {
        return this.apiService.put(`${this.controller}SortProduct`, vm)
    }

    updateProduct(productId: number, vm: any) {
        return this.apiService.put(`${this.controller}UpdateProduct/${productId}`, vm)
    }

    deletePromoVideo(productPromoVideoId: number) {
        return this.apiService.delete(`${this.controller}deletePromoVideo/${productPromoVideoId}`)
    }
}

export interface IMainCategory {
    mainCategoryId: number
    mainCategory: string
    cmsOrder: number
    cmsActive: boolean
    cmsActiveOverride: boolean
    showMainCategoryColour: number
    showOverrideSubCategory: number
}

export interface ISubCategory {
    subCategoryId: number
    subCategory: string
    cmsOrder: number
    cmsActive: boolean
    cmsActiveOverride: boolean
    imageUploaded: boolean
    showImageUploaded: number
}

export interface IProduct {
    productId: number
    regionCode: string
    subCategoryId: number
    modelName: string
    productSKU: string
    primaryDescription: string
    secondaryDescription: string
    cmsOrder: number
    displayOrder: number
    cmsActive: boolean
    cmsActiveOverride: boolean
    featuredProductActive: boolean
    hasImage: number
}

export interface IPromoVideo {
    productPromoVideoId: number
    promoVideoFilename: string
    videoName: string
}

export interface IFeaturedProduct {
    productId: number
    productSKU: string
    featuredProductDisplayLevel: string
    cmsOrder: number
}
