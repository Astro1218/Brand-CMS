import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import { environment } from '../../environments/environment'
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ApiService {
    api_url: string = environment.api_url

    headers: {} = { withCredentials: true }

    constructor(
        private httpClient: HttpClient,
        private snackBar: MdSnackBar
    ) { }

    get(path: string): Observable<any> {
        return this.httpClient.get(`${this.api_url}${path}`, this.headers)
            .catch((e) => this.handleError(e, path))
    }

    post(path: string, body: any): Observable<any> {
        return this.httpClient.post(`${this.api_url}${path}`, body, this.headers)
            .catch((e) => this.handleError(e, path))
    }

    put(path: string, body: any): Observable<any> {
        return this.httpClient.put(`${this.api_url}${path}`, body, this.headers)
            .catch((e) => this.handleError(e, path))
    }

    delete(path: string): Observable<any> {
        return this.httpClient.delete(`${this.api_url}${path}`, this.headers)
            .catch((e) => this.handleError(e, path))
    }

    handleError(error: any, url: string) {
        console.error(`***API SERVICE ERROR*** (${url})`, error)

        if (error.error.type === "error" && error.error.total === 0) {
            this.snackBar.open('Lost connection to server', '', { duration: 10000 })
        }

        if (typeof(error.error) == "string") {
            var obj = JSON.parse(error.error);
            if (obj.Type === "Exception") {
                console.log('Exception Log',obj)
                this.snackBar.open(obj.Exception.Message, '', { duration: 10000 })
            }

            if (obj.Type === "SQL Exception") {
                console.log('SQL Exception Log',obj)
                this.snackBar.open(obj.Exception.Message, '', { duration: 10000 })
            }
        }

        if(error.status === 400){
            this.snackBar.open('ModelState is invalid!', '', { duration: 10000 })
        }

        return Observable.throw(error || 'Server Error (caught in api.service)')
    }
}
