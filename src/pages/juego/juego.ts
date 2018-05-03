import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { PartidaProvider } from '../../providers/partida/partida';
import { TableProvider } from '../../providers/partida/table';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HomePage } from "../home/home";
import 'rxjs/add/observable/interval';


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
  sub:any;
  game:any;
  game_id:any;
  indice = 0;
  intervalito = 1;

  constructor(public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController, private tableService: TableProvider) {
    this.game = {random: [0,0,0]}
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
    this.play();
    this.partidaService.getGame(this.game_id).then( aa => {
      this.game = aa;
      this.intervalito = Number(this.game.settings.cardtimer);
    });
    this.sub = Observable.interval(1000*this.intervalito).subscribe((val) => {
      this.partidaService.getGame(this.game_id).then( aa => {
        this.game = aa;
        console.log(this.game.random[this.indice]);
        this.indice ++;
        if(this.indice>15){
          this.indice = 0;
        }
      });
     });
  }

  card(id){console.log( id )}

  play(){
    this.tb=this.navParams.get('tabla');
    this.game_id = this.navParams.get('game');
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
