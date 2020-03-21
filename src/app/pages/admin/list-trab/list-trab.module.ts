import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTrabPageRoutingModule } from './list-trab-routing.module';

import { ListTrabPage } from './list-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTrabPageRoutingModule
  ],
  declarations: [ListTrabPage]
})
export class ListTrabPageModule {}
