import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { PartidaProvider } from '../../providers/partida/partida';
import * as firebase from 'firebase';

/**
 * Generated class for the JuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juego',
  templateUrl: 'juego.html',
})
export class JuegoPage {
  tabla1=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
  tabla2=['17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32'];
  tabla3=['33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48'];
  tabla4=['49','50','51','52','53','2','3','4','6','8','10','12','14','16','18','20'];
  tabla5=['22','24','26','28','30','32','34','36','38','40','42','44','46','48','50','52'];
  tb:any;
  tabla=[];
  user:any;
  constructor(public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController) {
  }
  ionViewWillLeave(){
    //this.user= firebase.auth().currentUser;
    //this.partidaService.joinGame(this.user.email);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
    this.tb=this.navParams.get('tabla');
    console.log(this.tb);
    if(this.tb==1){
      this.tabla=this.tabla1;
    }else if(this.tb==2){
      this.tabla=this.tabla2;
    }else if(this.tb==3){
      this.tabla=this.tabla3;
    }else if(this.tb==4){
      this.tabla=this.tabla4;
    }else if(this.tb==5){
      this.tabla=this.tabla5;
    }
  }

  abrirChat(){
    const modalChat = this.modal.create(ChatPage);
    modalChat.present();
  }

}
