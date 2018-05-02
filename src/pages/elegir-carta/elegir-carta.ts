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
  tables = [
    [['1','2','3','4'],['5','6','7','8'],['9','10','11','12'],['13','14','15','16']],
    [['17','18','19','20'],['21','22','23','24'],['25','26','27','28'],['29','30','31','32']],
    [['33','34','35','36'],['37','38','39','40'],['41','42','43','44'],['45','46','47','48']],
    [['49','50','51','52'],['53','2','3','4'],['6','8','10','12'],['14','16','18','20']],
    [['22','24','26','28'],['30','32','34','36'],['38','40','42','44'],['46','48','50','52']]
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirCartaPage');
  }

  elegir(id$){
    this.view.dismiss(id$);
  }

}
