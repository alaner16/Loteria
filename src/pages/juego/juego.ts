import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { PartidaProvider } from '../../providers/partida/partida';
import { TableProvider } from '../../providers/partida/table';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';


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

  tb:any;
  public id: any;
  public tables: any;
  public table: any;
  user:any;

  constructor(public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController, private tableService: TableProvider) {
  }
  
  ionViewWillLeave(){

    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'flex';
    }
  }

  ionViewDidLoad() {
    this.user= firebase.auth().currentUser;
    console.log('ionViewDidLoad JuegoPage');
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
    this.play();
  }

  card(id){console.log( id )}

  play(){
    this.tb=this.navParams.get('tabla');
    console.log(this.tb);

    this.tableService.getTables().then(response =>{
      this.tables = response;
      this.table = this.tables[this.tb]
    }).catch(err =>{
      console.error(err);
    })
  }

  abrirChat(){
    const modalChat = this.modal.create(ChatPage);
    modalChat.present();
  }

  salir(){
    this.partidaService.leaveGame(this.user);
    this.navCtrl.setRoot(HomePage);
  }

}
