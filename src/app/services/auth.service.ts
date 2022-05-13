import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {
    controller: string = 'auth/'

    constructor(private apiService: ApiService) { }

    authAdmin(): Observable<IAuth> {
        return this.apiService.get(this.controller)
    }

    authUser(brandId: number): Observable<boolean> {
        return this.apiService.get(`${this.controller}${brandId}`)
    }
}

export interface IAuth {
    user: string
    isAdmin: Boolean
    env: string
}
