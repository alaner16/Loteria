import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TableProvider } from '../../providers/partida/table';
import { PartidaProvider } from '../../providers/partida/partida';
import * as firebase from 'firebase';
/**
 * import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
 *
*/


/**
 * Generated class for the ElegirCartaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elegir-carta',
  templateUrl: 'elegir-carta.html',
})
export class ElegirCartaPage {

  public tables: any;
  public user: any;
  public player: any;
  public room: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private tableService: TableProvider, public partidaService: PartidaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirCartaPage');
    this.user= firebase.auth().currentUser;
    this.player=this.user.email;
    this.getTables();
  }

  getTables(){
    this.tableService.getTables().then(response =>{
      this.tables = response;
    }).catch(err =>{
      console.error(err);
    })
  }
  
  elegir(id$){
    this.view.dismiss(id$);
    console.log('arriba de last game Function');
    this.partidaService.getlastroom(this.player).then(response =>{
      console.log(response);
      let player = response;
      this.partidaService.updateUserTable(player, id$);
    }).catch(err =>{
      console.error(err);
    })
    console.log(' aver el ID' + id$)
  }

}