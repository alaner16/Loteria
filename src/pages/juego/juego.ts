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
  indice2 = 0;
  intervalito = 1;
  subControl: any = false;
  owner: any;
  email: any;
  currentCard: any;
  players:any;
  public games: any;
  public showCard: any;
  public showControl: any;
  public room_request_check:any = {player_room: null, game_id: null, stats:[null,null,null], status: true};
  public room_request_full:any = {player_room: null, game_id: null, status: true};
  public room_request_blast:any = {player_room: null, game_id: null, status: true};
  public room_request_square:any = {player_room: null, game_id: null, status: true};
  public room_request_center:any = {player_room: null, game_id: null, status: true};
  public showClientControl: any = false;
  public showStats: any;
  public showStatscontrol: any;

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
    this.partidaService.leaveGame(this.user);
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
    //this.texto = (this.estadoPositivo) ?  "NO" : "SI";
    this.estadoPositivo[id] = !this.estadoPositivo[id];
    let valor = this.estadoPositivo[id];
    let index = 0;
    if(id < 4){

    }
    else if (id < 8) {
      index = 1;
      id = id - 4;
    }else if(id < 12){
      index = 2;
      id = id - 8;
    }else if(id <16){
      index = 3;
      id = id - 12;
    }

        let room;
         this.partidaService.get_my_room(this.user.email).then(xa => {
           room = xa;
           room.stats[index][id].marked = valor;

           let req = this.room_request_check;
           req.player_room = room.id;
           req.game_id = this.game_id;
           req.stats[0] = index;
           req.stats[1] = id;
          req.stats[2] = valor;

           this.partidaService.crear_request_check(req);

           //this.partidaService.update_stats(room);
           //this.is_full(room);
           //this.is_blast(room);
           //this.is_center(room);
           //this.is_kuatro(room);
          });

    //elementStyle(".si");
  }
  ionViewWillEnter(){
    this.game_id = this.navParams.get('game');
    this.partidaService.getGame(this.game_id).then( ab => {
      this.owner = ab;
      this.owner = this.owner.owner;
      this.afDB.list('/room/').valueChanges().subscribe(players => {
        this.partidaService.getPlayers(this.game_id).then(
          response => {
            this.players = response;
          }
        )
      });
      if(this.email != this.owner){
        this.showClientControl = true;
        this.showCard = this.afDB.list('/game/').valueChanges().subscribe(games => {
          this.partidaService.getGame(this.game_id).then(response =>{
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
      this.subControl = false;
    }
    if(this.showClientControl = true){
      this.showClientControl = false;
      this.showCard.unsubscribe();
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
          this.game.currentCard = this.indice2;
          this.game.status = "I";
        this.partidaService.update_card(this.game_id, this.game);
        this.indice = this.game.currentCard;
        this.indice2 ++;
        if(this.indice>53){
          this.indice = 0;
          this.indice2 = 0;
        }
        }else if(this.user.email != this.game.owner && this.game.status == "I"){
          this.intervalito = 1;
          this.indice = this.game.currentCard;
        }
        this.search_card(this.game.random[this.indice], this.table);
      });
     });
  }

is_full(room){
  let a = room.stats;
  if (
    a[0][0].marked == true &&
    a[0][1].marked == true &&
    a[0][2].marked == true &&
    a[0][3].marked == true &&
    a[1][0].marked == true &&
    a[1][1].marked == true &&
    a[1][2].marked == true &&
    a[1][3].marked == true &&
    a[2][0].marked == true &&
    a[2][1].marked == true &&
    a[2][2].marked == true &&
    a[2][3].marked == true &&
    a[3][0].marked == true &&
    a[3][1].marked == true &&
    a[3][2].marked == true &&
    a[3][3].marked == true
  ){
    let req = this.room_request_full;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_full(req);
    //this.partidaService.getGame(this.game_id).then( aa => {
    //    let a:any = aa;
    //  if (this.user.email == this.game.owner) {
    //    a.control['wins']['full'] = this.user.email;
    //  this.partidaService.update_card(this.game_id, a);}
    //});
  }
}
is_blast(room){
  let a = room.stats;
  if((a[0][0].marked == true && a[0][0].showed == true && a[1][1].marked == true && a[1][1].showed == true && a[2][2].marked == true && a[2][2].showed == true && a[3][3].marked == true && a[3][3].showed == true)||(a[0][3].marked == true && a[0][3].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][0].marked == true && a[2][0].showed == true)){
    let req = this.room_request_blast;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_blast(req);
    //this.partidaService.getGame(this.game_id).then(response =>{
      //let d:any = response;
      //d.control.wins.blast = this.user.email;
      //this.partidaService.update_wins(this.game_id, d);
    //})
  }
}
is_center(room){
  let a = room.stats;
  if(a[1][1].marked == true && a[1][1].showed == true && a[1][2].marked == true && a[1][2].showed == true && a[2][1].marked == true && a[2][1].showed == true && a[2][2].marked == true && a[2][2].showed == true){
    let req = this.room_request_center;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_center(req);
    //this.partidaService.getGame(this.game_id).then(response =>{
      //let d:any = response;
      //d.control.wins.center = this.user.email;
      //this.partidaService.update_wins(this.game_id, d);
    //})
  }
}
is_kuatro(room){
  let a = room.stats;
  if(a[0][0].marked == true && a[0][0].showed == true && a[0][3].marked == true && a[0][3].showed == true && a[3][0].marked == true && a[3][0].showed == true && a[3][3].marked == true && a[3][3].showed == true){
    let req = this.room_request_square;
    req.game_id = this.game_id;
    req.player_room = room.id;

    this.partidaService.crear_request_square(req);
    //this.partidaService.getGame(this.game_id).then(response =>{
      //let d:any = response;
      //d.control.wins.quarter = this.user.email;
      //this.partidaService.update_wins(this.game_id, d);
    //})
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

           //this.partidaService.update_stats(room);
           //this.is_full(room);
           //this.is_blast(room);
           //this.is_center(room);
           //this.is_kuatro(room);
          });
          break;
        }
      }

    }
  }

}
