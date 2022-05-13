import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class RemoteContentService {
    controller: string = 'remoteContent/'

    constructor(private apiService: ApiService) { }

    getContent(brand, prefix): Observable<any> {
        return this.apiService.get(`${this.controller}getContent?brand=${brand}&prefix=${prefix}`)
    }

    post(model: any): Observable<boolean> {
        return this.apiService.post(`${this.controller}post`, model)
    }

    delete(model: any): Observable<boolean> {
        return this.apiService.post(`${this.controller}delete`, model)
    }

    uploadFiles(formData: any): Observable<boolean> {
        return this.apiService.post(`${this.controller}uploadFiles`, formData)
    }
}
