import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

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
  partidas: boolean = false;
  cartas: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {}

  ionViewWillEnter(){
    this.menu.enable(true,'menurecords');
  }

  ionViewWillLeave(){
    this.menu.enable(false,'menurecords');
  }

}
