import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JuegoPage } from '../juego/juego';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  entrarJuego():void{
    this.navCtrl.push(JuegoPage);
  }
}
