import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeaturedComponent } from './featured.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [],
    declarations: [FeaturedComponent],
    providers: [],
})
export class FeaturedModule { }
