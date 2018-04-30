import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PartidaProvider } from '../../providers/partida/partida';

/**
 * Generated class for the UnirsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unirse',
  templateUrl: 'unirse.html',
})
export class UnirsePage {
  public i: any;
  public games: any;
  public listGame = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public partidaService: PartidaProvider) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad UnirsePage');
    this.partidaService.getGames(result =>{
      if(result!=null)this.games=result.val();
      console.log(this.games);
      var ids = Object.keys(this.games);
      console.log(ids[1]);
      //var x =this.games.child(key).val();
      var count = Object.keys(this.games).length;
        for(var i = 0; i < count; i++){
          var key = ids[i];
          console.log(result.child(key).val());
          var game = result.child(key).val()
          this.listGame.push(game);
        }
   
      console.log(this.listGame);
    });

  }

}
