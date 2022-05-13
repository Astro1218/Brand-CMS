import { ResourceStringsComponent } from './resource-strings/resource-strings.component';
import { ContentCollectionComponent } from './content-collections/content-collection.component';
import { ContentRegionComponent } from './content-regions/content-region.component';
import { FeaturedComponent } from './featured/featured.component';
import { ModelsComponent } from './models/models.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component'
import { RemoteContentComponent } from './remote-content/remote-content.component'
import { BrandComponent } from './brand.component'
import { CustomerFAQsComponent } from './customer-faqs/customer-faqs.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProductsComponent } from './products/products.component'
import { StockistsComponent } from './stockists/stockists.component'

import { Routes } from '@angular/router'
import { ImageGalleriesComponent } from "./image-galleries/galleries.component";
import { ImageGalleryItemComponent } from './image-galleries/item/gallery-item.component';
import { ContentRegionItemComponent } from './content-regions/content-region-item.component';
import { ContentCollectionItemComponent } from './content-collections/content-collection-item.component';
import { PageTemplatesComponent } from './page-templates/page-templates.component';
import { SiteFAQsComponent } from './site-faqs/site-faqs.component';
import { ProductGuideComponent } from './product-guide/product-guide.component';
import { ProductGuideItemComponent } from './product-guide/guide-item.component';
import { PMRComponent } from './product-magazine-reviews/pmr.component';
import { PMRItemComponent } from './product-magazine-reviews/pmr-item.component';
import { CompetitionComponent } from './competitions/competition.component';
import { CompetitionItemComponent } from './competitions/competition-item.component';
import { AccountsComponent } from './accounts/accounts.component';

export const brandRoutes: Routes = [
    {
        path: ':brand/:brandId',
        component: BrandComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:mainId', component: ProductsComponent },
            { path: 'products/:mainId/:subId', component: ProductsComponent },
            { path: 'product-faqs', component: CustomerFAQsComponent },
            { path: 'stockists', component: StockistsComponent },
            { path: 'remote-content', component: RemoteContentComponent },
            { path: 'customer-reviews', component: CustomerReviewsComponent },
            { path: 'models', component: ModelsComponent },
            { path: 'image-galleries', component: ImageGalleriesComponent },
            { path: 'image-galleries/:id/:code/:name', component: ImageGalleryItemComponent },
            { path: 'featured', component: FeaturedComponent },
            { path: 'content-regions', component: ContentRegionComponent },
            { path: 'content-regions/:contentRegionId', component: ContentRegionItemComponent },
            { path: 'content-collections', component: ContentCollectionComponent },
            { path: 'content-collections/:collectionId', component: ContentCollectionItemComponent },
            { path: 'resource-strings', component: ResourceStringsComponent },
            { path: 'page-templates', component: PageTemplatesComponent },
            { path: 'site-faqs', component: SiteFAQsComponent },
            { path: 'category-guide', component: ProductGuideComponent },
            { path: 'category-guide/:guideId', component: ProductGuideItemComponent },
            { path: 'product-magazine-reviews', component: PMRComponent },
            { path: 'product-magazine-reviews/:itemId', component: PMRItemComponent },
            { path: 'competitions', component: CompetitionComponent },
            { path: 'competitions/:itemId', component: CompetitionItemComponent },
            { path: 'accounts', component: AccountsComponent },
        ]
    }
]
