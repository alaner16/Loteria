import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CrearPartidaPage } from '../crear-partida/crear-partida';
import { UnirsePage } from "../unirse/unirse";
import { RecordPage } from "../record/record";
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController, private auth: AuthService, private nativeAudio: NativeAudio) {
    
  }

  ionViewWillEnter(){
    
    
  }

  ionViewWillLeave(){
    //this.nativeAudio.stop('rolilla');
  }

  crearPartida(): void {
    this.navCtrl.push(CrearPartidaPage);
  }
  unirsePartida(): void {
    this.navCtrl.push(UnirsePage);
  }
  records(): void {
    this.navCtrl.push(RecordPage);
  }
  Login(): void {
    this.navCtrl.push(LoginPage);
  }
  logout(): void {
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
