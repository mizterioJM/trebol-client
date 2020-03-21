import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegTrabPageRoutingModule } from './reg-trab-routing.module';

import { RegTrabPage } from './reg-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegTrabPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegTrabPage],
})
export class RegTrabPageModule {}
