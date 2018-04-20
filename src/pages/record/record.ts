import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import fontawesome from "@fortawesome/fontawesome";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
  }

}
