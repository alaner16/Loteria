import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuegoPage');
  }

  abrirChat(){
    const modalChat = this.modal.create(ChatPage);
    modalChat.present();
  }

}
