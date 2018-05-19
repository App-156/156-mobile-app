import { MapPage } from './map';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [MapPage],
  imports: [IonicPageModule.forChild(MapPage)],
  entryComponents: [MapPage]
})
export class MapPageModule { }