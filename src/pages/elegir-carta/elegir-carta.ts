import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TableProvider } from '../../providers/partida/table';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private tableService: TableProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirCartaPage');
    this.getTables();
  }

  getTables(){
    this.tableService.getTables().then(response =>{
      this.tables = response;
      //console.log(this.tables);
    }).catch(err =>{
      console.error(err);
    })
  }
  hola(id){console.log('la carta ' + id )}
  
  elegir(id$){
    this.view.dismiss(id$);
    console.log(' aver el ID' + id$)
  }

}