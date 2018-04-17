import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { UnirsePage } from "../unirse/unirse";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  crearPartida(): void {
    this.navCtrl.push(AboutPage);
  }
  unirsePartida(): void {
    this.navCtrl.push(UnirsePage);
  }
}
