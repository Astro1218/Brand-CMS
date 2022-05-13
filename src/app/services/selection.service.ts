import { IBrands } from './admin.service'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class SelectionService {
    controller: string = 'selection/'

    constructor(private apiService: ApiService) { }

    getBrandsWithADCheck(): Observable<Array<IBrands>> {
        return this.apiService.get(this.controller)
    }
}
