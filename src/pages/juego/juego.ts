import { Component, style } from '@angular/core';
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


  constructor(public navCtrl: NavController,public partidaService: PartidaProvider, public navParams: NavParams, private modal: ModalController, private tableService: TableProvider) {
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
          this.indice = this.game.currentCard;
        }
      });
     });
  }

}
