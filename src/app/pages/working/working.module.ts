import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkingPageRoutingModule } from './working-routing.module';

import { WorkingPage } from './working.page';
import { ComponentsModule } from '@myapp-components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkingPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [WorkingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkingPageModule {}
