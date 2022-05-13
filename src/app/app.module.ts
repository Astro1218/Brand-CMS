import { ServiceModule } from './services/service.module'
import { HttpClientModule } from '@angular/common/http'
import { AdminModule } from './admin/admin.module'
import { ImageService } from './services/image.service'
import { routes, routeComponents } from './app.routing'
import { BrandModule } from './brand-content/brand.module'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { MaterialModule } from './material.module'

import { AppComponent } from './app.component'
import { StockistDialogComponent } from './brand-content/stockists/stockist-dialog.component'

// Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures.
import 'hammerjs'


@NgModule({
  declarations: [
    AppComponent,
    routeComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    AdminModule,
    BrandModule,
    ServiceModule
  ],
  entryComponents: [
    StockistDialogComponent
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
