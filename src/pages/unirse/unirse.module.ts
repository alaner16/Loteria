import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnirsePage } from './unirse';

@NgModule({
  declarations: [
    UnirsePage,
  ],
  imports: [
    IonicPageModule.forChild(UnirsePage),
  ],
})
export class UnirsePageModule {}
