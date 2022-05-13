import { IBrands } from './admin.service'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class ImageGalleryService {
    controller: string = 'imageGallery/'

    constructor(private apiService: ApiService) { }

    getImageGalleries(brandId: number): Observable<Array<IImageGallery>> {
        return this.apiService.get(`${this.controller}getImageGalleries/${brandId}`)
    }

    getImageGalleryItems(ImageGalleryId: number): Observable<Array<IImageGalleryItem>> {
        return this.apiService.get(`${this.controller}getImageGalleryItems/${ImageGalleryId}`)
    }

    getMobileImage(ImageGalleryId: number): Observable<IMobileImage> {
        return this.apiService.get(`${this.controller}mobileImageGalleryItem/${ImageGalleryId}`)
    }

    InsertMobileImageGalleryItem(model) {
        return this.apiService.post(`${this.controller}insertMobileImageGalleryItem`, model)
    }

    insertImageGalleryItem(model) {
        return this.apiService.post(`${this.controller}insertImageGalleryItem`, model)
    }

    insertImageGallery(model) {
        return this.apiService.post(`${this.controller}insertImageGallery`, model)
    }

    updateGalleryItemSort(ImageGalleryId: number, model) {
        return this.apiService.put(`${this.controller}updateGalleryItemSort/${ImageGalleryId}`, model)
    }

    deleteImageGalleryItem(ImageGalleryId: number, ImageGalleryItemId: number) {
        return this.apiService.delete(`${this.controller}deleteImageGalleryItem/${ImageGalleryId}/${ImageGalleryItemId}`)
    }

    deleteImageGalleryAndAllItems(ImageGalleryId: number) {
        return this.apiService.delete(`${this.controller}deleteImageGalleryAndAllItems/${ImageGalleryId}`)
    }

    deleteMobileImageGalleryItem(ImageGalleryItemId: number, mobileImageGalleryItemId: number) {
        return this.apiService.delete(`${this.controller}deleteMobileImageGalleryItem/${ImageGalleryItemId}/${mobileImageGalleryItemId}`)
    }
}

export interface IImageGallery {
    imageGalleryId: number
    brandId: number
    languageId: number
    cultureCode: string
    imageGalleryName: string
    description: string
    height: number
    width: number
}

export interface IImageGalleryItem {
    imageGalleryItemId: number
    imageGalleryId: number
    filename: string
    displayOrder: number
    urLtoLinkTo: string
    itemDescription: string
    imageUrl: string
    title: string
    altTag: string
    loadSeparateTab: boolean
    dateFrom: Date
    dateTo: Date
    cmsActive: boolean
    mobileImgExists: number
    path: string
}

export interface IMobileImage {
    imageGalleryItemId: number
    imageGalleryId: number
    filename: string
    displayOrder: number
    urLtoLinkTo: string
    itemDescription: string
    imageUrl: string
    title: string
    altTag: string
}
