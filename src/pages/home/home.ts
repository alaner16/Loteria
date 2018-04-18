import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CrearPartidaPage } from '../crear-partida/crear-partida';
import { UnirsePage } from "../unirse/unirse";
import { RecordPage } from "../record/record";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  crearPartida(): void {
    this.navCtrl.push(CrearPartidaPage);
  }
  unirsePartida(): void {
    this.navCtrl.push(UnirsePage);
  }
  records(): void {
    this.navCtrl.push(RecordPage);
  }
}
