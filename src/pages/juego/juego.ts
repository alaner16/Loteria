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
  subControl: any;


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
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
    this.play();
    this.partidaService.getGame(this.game_id).then( aa => {
      this.game = aa;
      this.intervalito = Number(this.game.settings.cardtimer);
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
    if(this.subControl == true){
      this.sub.unsubscribe();
    }
    this.partidaService.leaveGame(this.user);
    this.navCtrl.setRoot(HomePage);
  }

  iniciar(){
    this.subControl = true;
    this.sub = Observable.interval(1000*this.intervalito).subscribe((val) => {
      this.partidaService.getGame(this.game_id).then( aa => {
        this.game = aa;
        if (this.user.email == this.game.owner) {
          this.game.currentCard = this.indice;
        this.partidaService.update_card(this.game_id, this.game);
        this.indice ++;
        if(this.indice>15){
          this.indice = 0;
        }
        }else{
          this.intervalito = 1;
          this.indice = this.game.currentCard;
        }
        this.search_card(this.game.random[this.indice], this.table);
      });
     });
  }
is_full(room){
  room.stats.forEach(element => {
    element.forEach(e => {
      if(!e.marked){
        console.log('no es full');
      }
    });
  });
  console.log('es full alv');
}
is_blast(room){
  let a = room.stats;
  if((a[0][0].marked && a[1][1].marked && a[2][2].marked && a[3][3].marked)||(a[0][3].marked && a[1][2].marked && a[2][1].marked && a[2][0].marked)){
    console.log('chorro');
  }
}
is_center(room){
  let a = room.stats;
  if(a[1][1].marked && a[1][2].marked && a[2][1].marked && a[2][2].marked){
    console.log('centro');
  }
}
is_kuatro(room){
  let a = room.stats;
  if(a[0][0].marked && a[0][3].marked && a[3][0].marked && a[3][3].marked){
    console.log('centro');
  }
}

  search_card(carta, table){
    for (let index = 0; index < table.length; index++) {
      for (let i = 0; i < table[index].length; i++) {
        if (table[index][i] == carta) {
         let room;
         this.partidaService.get_my_room(this.user.email).then(xa => {
           room = xa;
           room.stats[index][i].showed = true;
           this.partidaService.update_stats(room);
           this.is_full(room);
           this.is_blast(room);
           this.is_center(room);
           this.is_kuatro(room);
          });
          break;
        }
      }

    }
  }

}
