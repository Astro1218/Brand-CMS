import { BrandEditComponent } from './brand/brand-edit.component'
import { AdminComponent } from './admin.component'

import { Routes } from '@angular/router'
import { AdminResourceStringsComponent } from './resource-strings/resource-strings.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        // children: [
        //     { path: ':brand/edit', component: BrandEditComponent },
        //     // { path: 'main-categories', component: MainCategoryComponent },
        //     // { path: 'sub-categories', component: SubCategoryComponent },
        //     // { path: 'products', component: ProductsComponent },
        //     // { path: 'customer-faqs', component: CustomerFAQsComponent },
        //     // { path: 'stockists', component: StockistsComponent },
        //     // { path: 'site-content', component: SiteContentComponent },
        //     // { path: 'remote-content', component: RemoteContentComponent },
        //     // { path: 'customer-reviews', component: CustomerReviewsComponent }
        // ]
    },
    { path: 'admin/resource-strings', component: AdminResourceStringsComponent },
    { path: 'admin/:brand/edit/:brandId', component: BrandEditComponent }
]
