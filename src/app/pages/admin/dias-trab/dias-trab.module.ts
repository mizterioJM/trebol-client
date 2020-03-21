import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiasTrabPageRoutingModule } from './dias-trab-routing.module';

import { DiasTrabPage } from './dias-trab.page';
import { PipesModule } from 'app/pipes/pipes.module';
import { EditTrabPage } from '../edit-trab/edit-trab.page';
import { EditTrabPageModule } from '../edit-trab/edit-trab.module';

@NgModule({
  entryComponents: [EditTrabPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiasTrabPageRoutingModule,
    PipesModule,
    EditTrabPageModule,
  ],
  declarations: [DiasTrabPage],
})
export class DiasTrabPageModule {}
