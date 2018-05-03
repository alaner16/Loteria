import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PartidaProvider } from '../../providers/partida/partida';
import { ElegirCartaPage } from '../elegir-carta/elegir-carta';
import { JuegoPage } from "../juego/juego";
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the UnirsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unirse',
  templateUrl: 'unirse.html',
})
export class UnirsePage {
  public i: any;
  public games: any;
  public listGame: any;
  public user: any;
  public email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public partidaService: PartidaProvider, private modal: ModalController, private toastCtrl: ToastController) {
    this.user= firebase.auth().currentUser;
    this.email=this.user.email;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UnirsePage');
    this.refreshGames();

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Se han actualizado las partidas disponibles",
      duration: 1500,
      position: "top"
    });
    toast.present();
  }

  refreshGames(){
    this.listGame = [];
    console.log('refrescando');
    this.partidaService.getPublicGames()
    .then(response =>{
      this.listGame = response;
    })
    .catch(err =>{
      console.error(err);
    })
  }

  goPlay(id){
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    var player ={
      id_game: id,
      player: this.email,
      table: 0,
      stats: [
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}],
        [{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false},{showed: false, marked:false}]
        ],
      status: 'A',
      timestamp: timestamp
    }
    this.partidaService.getGame(id).then(response =>{
      let currentGame: any = [];
      currentGame = response
      if(currentGame.control.players < currentGame.settings.players){
        this.partidaService.joinGame(player);
        const modalElegirCarta = this.modal.create(ElegirCartaPage,{carta:null });
        modalElegirCarta.onDidDismiss(data => {
          this.navCtrl.push(JuegoPage,{tabla:data, game: id});
        });
        modalElegirCarta.present();
      }else{

          let toast = this.toastCtrl.create({
            message: "La sala está llena",
            duration: 1500,
            position: "top"
          });
          toast.present();

      }
    });
  }

  play(dataUser){
    console.log(dataUser);
  }

}
