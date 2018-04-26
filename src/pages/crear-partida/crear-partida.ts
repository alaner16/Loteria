import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { JuegoPage } from "../juego/juego";
import { PartidaProvider } from '../../providers/partida/partida';
import { ElegirCartaPage } from '../elegir-carta/elegir-carta';
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
  newItem = {id:'',players:0,tiempo:0,llena:false,chorro:false,esquinas:false,centrito:false,random:[],actual:0};
  constructor(public navCtrl: NavController, public navParams: NavParams,public pp:PartidaProvider, private modal: ModalController) {}
  id:any=''; players:any=0;tiempo:any=0;llena:any=false;chorro:any=false;esquinas:any=false;centrito:any=false;
  ionViewDidLoad() {
    console.log("ionViewDidLoad CrearPartidaPage");
  }
  setData(){
    this.newItem.id=this.id;
    this.newItem.players;
    this.newItem.tiempo=this.tiempo;
    this.newItem.llena=this.llena;
    this.newItem.chorro=this.chorro;
    this.newItem.esquinas=this.esquinas;
    this.newItem.centrito=this.centrito;
//Define la cantidad de numeros aleatorios.
    var cantidadNumeros = 54;
    var myArray = []
    while(myArray.length < cantidadNumeros ){
      var numeroAleatorio = Math.ceil(Math.random()*cantidadNumeros);
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
    this.newItem.random=myArray;
    console.log(this.newItem.random);
  }
  entrarJuego(): void {
    this.setData();
    console.log(this.newItem);
    this.addItem();
    this.navCtrl.push(JuegoPage);
    const modalElegirCarta = this.modal.create(ElegirCartaPage);
    modalElegirCarta.present();
  }
  addItem() {
    //console.log("hola");
    this.pp.crearPartida(this.newItem);
  }
}
