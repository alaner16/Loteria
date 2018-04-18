import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JuegoPage } from "../juego/juego";

/**
 * Generated class for the CrearPartidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-crear-partida",
  templateUrl: "crear-partida.html"
})
export class CrearPartidaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CrearPartidaPage");
  }
  entrarJuego(): void {
    this.navCtrl.push(JuegoPage);
  }
}
