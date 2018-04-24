import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JuegoPage } from "../juego/juego";
import { PartidaProvider } from '../../providers/partida/partida';
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
  newItem = {id:0,players:0,tiempo:0,llena:false,chorro:false,esquinas:false,centrito:false};
  constructor(public navCtrl: NavController, public navParams: NavParams,public pp:PartidaProvider) {}
  id:any=0; players:any=0;tiempo:any=0;llena:any=false;chorro:any=false;esquinas:any=false;centrito:any=false;
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

  }
  entrarJuego(): void {
    this.setData();
    console.log(this.newItem);
    this.addItem();
    this.navCtrl.push(JuegoPage);
  }
  addItem() {
    //console.log("hola");
    this.pp.crearPartida(this.newItem);
  }
}
