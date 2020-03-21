import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JaulasPageRoutingModule } from './jaulas-routing.module';

import { JaulasPage } from './jaulas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JaulasPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [JaulasPage],
})
export class JaulasPageModule {}
