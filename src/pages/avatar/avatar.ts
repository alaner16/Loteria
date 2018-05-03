import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})
export class AvatarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }
  seleccionar(id){
    
    let Avatar = id;
    this.view.dismiss(Avatar);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarPage');
  }

}
