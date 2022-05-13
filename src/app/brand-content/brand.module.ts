import { ResourceStringsModule } from './resource-strings/resource-strings.module';
import { ContentCollectionModule } from './content-collections/content-collection.module';
import { ContentRegionModule } from './content-regions/content-region.module';
import { FeaturedModule } from './featured/featured.module';
import { ImageGalleriesModule } from './image-galleries/galleries.module';
import { ModelsModule } from './models/models.module';
import { CustomerReviewsModule } from './customer-reviews/customer-reviews.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { BrandComponent } from './brand.component'
import { brandRoutes } from './brand.routes'
import { CustomerFAQsModule } from './customer-faqs/customer-faqs.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { ProductsModule } from './products/products.module'
import { StockistsModule } from './stockists/stockists.module'
import { RemoteContentModule } from './remote-content/remote-content.module'
import { PageTemplatesModule } from './page-templates/page-templates.module';
import { SiteFAQsModule } from './site-faqs/site-faqs.module';
import { ProductGuideModule } from './product-guide/product-guide.module';
import { PMRModule } from './product-magazine-reviews/pmr.module';
import { CompetitionModule } from './competitions/competition.module';
import { AccountsModule } from './accounts/accounts.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(brandRoutes),
        DashboardModule,
        ProductsModule,
        CustomerFAQsModule,
        StockistsModule,
        RemoteContentModule,
        CustomerReviewsModule,
        ModelsModule,
        ImageGalleriesModule,
        FeaturedModule,
        ContentRegionModule,
        ContentCollectionModule,
        ResourceStringsModule,
        PageTemplatesModule,
        SiteFAQsModule,
        ProductGuideModule,
        PMRModule,
        CompetitionModule,
        AccountsModule
    ],
    exports: [BrandComponent],
    declarations: [BrandComponent],
    providers: [],
})
export class BrandModule { }
