import { SelectionComponent } from './selection.component'
import { Routes } from '@angular/router'
import { AuthenticationComponent } from './shared/authentication.component';


export const routes: Routes = [
    { path: '401', component: AuthenticationComponent },
    { path: '', component: SelectionComponent },
    { path: '**', component: SelectionComponent },
    
]

export const routeComponents = [
    SelectionComponent,
    AuthenticationComponent
]