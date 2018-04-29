import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { AuthService } from '../../services/auth.service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConfigPage");
  }
 

  Perfil(){
    this.navCtrl.push(PerfilPage);
  }
  logout(): void {
    this.auth.signOut();
    this.navCtrl.setRoot(ConfigPage);
    this.navCtrl.parent.select(0);
  }

}
