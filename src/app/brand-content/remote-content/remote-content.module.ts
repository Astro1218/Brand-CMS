import { NgModule } from '@angular/core';

import { RemoteContentComponent } from './remote-content.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule],
    exports: [],
    declarations: [RemoteContentComponent],
    providers: [],
})
export class RemoteContentModule { }
