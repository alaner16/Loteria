import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-config",
  templateUrl: "config.html"
})
export class ConfigPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConfigPage");
  }
  Login(): void {
    this.navCtrl.push(LoginPage);
  }

  Perfil(){
    this.navCtrl.push(PerfilPage);
  }

}
