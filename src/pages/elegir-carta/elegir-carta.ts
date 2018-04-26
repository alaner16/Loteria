import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirCartaPage');
  }

  elegir(){
    this.view.dismiss();
  }

}
