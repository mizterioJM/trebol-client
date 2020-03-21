import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from './fecha.pipe';

@NgModule({
  declarations: [FechaPipe],
  exports: [FechaPipe],
})
export class PipesModule {}
