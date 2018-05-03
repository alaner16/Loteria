import { Component, style } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { PartidaProvider } from '../../providers/partida/partida';
import { TableProvider } from '../../providers/partida/table';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HomePage } from "../home/home";
import 'rxjs/add/observable/interval';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
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

  //texto: string =  "SI";
  estadoPositivo = [];
  

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
  owner: any;
  email: any;
  currentCard: any;
  public games: any


  constructor(public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController, private tableService: TableProvider, public afDB: AngularFireDatabase) {
    this.game = {random: [0,0,0]}
    this.estadoPositivo[0] = false;
    this.estadoPositivo[1] = false;
    this.estadoPositivo[2] = false;
    this.estadoPositivo[3] = false;
    this.estadoPositivo[4] = false;
    this.estadoPositivo[5] = false;
    this.estadoPositivo[6] = false;
    this.estadoPositivo[7] = false;
    this.estadoPositivo[8] = false;
    this.estadoPositivo[9] = false;
    this.estadoPositivo[10] = false;
    this.estadoPositivo[11] = false;
    this.estadoPositivo[12] = false;
    this.estadoPositivo[13] = false;
    this.estadoPositivo[14] = false;
    this.estadoPositivo[15] = false;
  }

  ionViewWillLeave(){
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'flex';
    }
  }

  ionViewDidLoad() {
    this.user= firebase.auth().currentUser;
    this.email = this.user.email;
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

  card(id){
    console.log( id );
    //this.texto = (this.estadoPositivo) ?  "NO" : "SI";
    this.estadoPositivo[id] = !this.estadoPositivo[id];
    //elementStyle(".si"); 
  }
  ionViewWillEnter(){
    this.game_id = this.navParams.get('game');
    this.partidaService.getGame(this.game_id).then( ab => {
      this.owner = ab;
      this.owner = this.owner.owner;
      console.log(this.game_id);
      console.log(this.email);
      console.log(this.owner);
      if(this.email != this.owner){
        this.afDB.list('/game/').valueChanges().subscribe(games => {
        this.games = games;
        this.partidaService.getGame(this.game_id).then(response =>{
          console.log(response);
          this.iniciar();
        })
      });
      }
      
    });
  }

 // card(id){console.log( id )}
  
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
          this.game.status = "I";
        this.partidaService.update_card(this.game_id, this.game);
        this.indice ++;
        if(this.indice>15){
          this.indice = 0;
        }
        }else if(this.user.email != this.game.owner && this.game.status == "I"){
          this.intervalito = 1;
          this.indice = this.game.currentCard;
          console.log(this.indice);
        }
        //this.search_card(this.game.random[this.indice], this.table);
      });
     });
  }
  /*
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
  }*/

}
