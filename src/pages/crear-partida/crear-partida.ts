import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JuegoPage } from "../juego/juego";
import { PartidaProvider } from '../../providers/partida/partida';
import { ElegirCartaPage } from '../elegir-carta/elegir-carta';
import * as firebase from 'firebase';

/**
 * Generated class for the CrearPartidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-crear-partida",
  templateUrl: "crear-partida.html"
})
export class CrearPartidaPage {
  auth:any;
  user:any;
  i:any;
  email:any;
  public player: any;
  newGame = {title: '', description: null, timestamp: 0, owner: '', type: '', status:'', settings: {},random:{}, room: {}};
  settings = {players:0, cardtimer:0, full:false, blast:false, quarters:false, middle:false};

  constructor(public navCtrl: NavController, public navParams: NavParams,public pp:PartidaProvider, private modal: ModalController) {
    this.i=true;
    this.user= firebase.auth().currentUser;
    this.email=this.user.email;
    //console.log(this.email);
    /*if(this.i==true){
    this.i=false;
    this.perfilService.getPerfil((this.user.email),(result) => { 
      if(result!=null)this.email=result;
      //console.log(this.Perfil);
    });}*/
  }
  title:any=''; description:any = null; timestamp:any; players:any; cardtimer:any; full:any=false; blast:any=false; quarters:any=false; middle:any=false; status:any; type:any = '';
  

  setData(){
    this.status = 'w';
    this.newGame.title = this.title
    this.newGame.description = null;
    this.newGame.timestamp = this.timestamp;
    this.newGame.owner = this.email;
    this.newGame.type = this.type;
    this.newGame.status = this.status;
    this.settings.players = this.players;
    this.settings.cardtimer = this.cardtimer;
    this.settings.full = this.full;
    this.settings.blast = this.blast;
    this.settings.quarters = this.quarters;
    this.settings.middle = this.middle;

    //Define la cantidad de numeros aleatorios.
    var numCards = 54;
    
    var myArray = []
    while(myArray.length < numCards ){
      var numeroAleatorio = Math.ceil(Math.random() * numCards);
      var existe = false;
      for(var i=0;i<myArray.length;i++){
      if(myArray [i] == numeroAleatorio){
            existe = true;
            break;
        }
      }
      if(!existe){
        myArray[myArray.length] = numeroAleatorio;
      }
    }
    this.newGame.random = myArray;
    this.newGame.settings = this.settings;

  }
  entrarJuego(): void {
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.setData();

    this.addItem();
    this.navCtrl.push(JuegoPage);
    const modalElegirCarta = this.modal.create(ElegirCartaPage);
    modalElegirCarta.present();
  }
  addItem() {
    //console.log("hola");
    this.pp.crearPartida(this.newGame);
    this.player = {
      player: this.email,
      status: 'A',
      table: 0,
      currentCard: 0,
      timestamp: this.timestamp
    }
    this.newGame.room = this.player;
    this.pp.createRoom(this.player);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CrearPartidaPage");
  }
}
