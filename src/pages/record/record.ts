import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController, AlertController, Alert } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { PartidaProvider } from "../../providers/partida/partida";
/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
  showCard: any;
  showClientControl: any;
  partidas: boolean = false;
  cartas: boolean = true;
  owner: any;
  game_id: any;
  players: any;
  user:any;
  email: any;
  cosas:any = {full:0,blast:0,quarter:0, center:0, total:0};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private afd: AngularFireDatabase,
    private pp: PartidaProvider) {
    this.user = firebase.auth().currentUser;
    pp.getGamesWhereWin(this.user.email).then(mi_codigo_mi_variable => {
      this.cosas = mi_codigo_mi_variable;
    });
  }

  ionViewWillEnter(){
    this.menu.enable(true,'menurecords');
  }

  ionViewWillLeave(){
    this.menu.enable(false,'menurecords');
  }

  modal(myEvent){
    console.log("game" + this.game_id)
    this.pp.getlastgame("abraham-alvarado@hotmail.com").then( ab => {
      this.owner = ab;
      console.log(this.owner);


    });

    let alert = this.alertCtrl.create({
      title: 'PARTIDA FINALIZADA',
      message: 'El juego a terminado:<br/> <br/>Chorro:  '+ (this.owner.control.wins.blast) +'<br/>Cuatro Esquinas:  '+ (this.owner.control.wins.quarter) +'<br/>Centrito:  '+ (this.owner.control.wins.center) +'<br/>Llenas:  '+ (this.owner.control.wins.full) +'',
      buttons: [
        {
          text: 'Salir Sala',
          role: 'cancel',
          handler: () => {
            //console.log(this.pp.getGame());
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Volver a Jugar',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
