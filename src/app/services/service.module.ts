import { GeolocationService } from './geolocation.service';
import { ContentCollectionService } from './content-collection.service';
import { ContentRegionService } from './content-region.service';
import { ImageGalleryService } from './imageGallery.service';
import { ModelService } from './model.service';
import { ProductService } from './product.service';
import { DashboardService } from './dashboard.service';
import { CustomerFAQsService } from './customer-faqs.service'
import { CustomerReviewsService } from './customer-reviews.service'
import { StockistService } from './stockist.services'
import { CommonService } from './common.service'
import { CommonModule } from '@angular/common'
import { SelectionService } from './selection.service'
import { AdminService } from './admin.service'
import { AuthService } from './auth.service'
import { ApiService } from './api.service'
import { NgModule } from '@angular/core'
import { ResourceStringsService } from './resource-strings.service';
import { MapService } from './map.service';
import { PageTemplateService } from './page-template.service';
import { SiteFAQsService } from './site-faqs.service';
import { ProductGuideService } from './product-guide.service';
import { RemoteContentService } from './remote-content.service';
import { UserService } from './user.services';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        ApiService,
        AuthService,
        AdminService,
        SelectionService,
        CommonService,
        StockistService,
        CustomerReviewsService,
        CustomerFAQsService,
        DashboardService,
        ProductService,
        ModelService,
        ImageGalleryService,
        ContentRegionService,
        ContentCollectionService,
        ResourceStringsService,
        GeolocationService,
        MapService,
        PageTemplateService,
        SiteFAQsService,
        ProductGuideService,
        RemoteContentService,
        UserService
    ],
})
export class ServiceModule { }
