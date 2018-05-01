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
    this.refreshGames();

  }
  refreshGames(){
    this.listGame = [];
    console.log('refrescando');
    this.partidaService.getGames(result =>{
      if(result!=null)this.games=result.val();
      console.log(this.games);
      var ids = Object.keys(this.games);
      //var x =this.games.child(key).val();
      var count = Object.keys(this.games).length;
        for(var i = 0; i < count; i++){
          var key = ids[i];
          //console.log(result.child(key).val());

          var item = result.child(key).val();
          if(item.status == 'w'){
          var game = {
            id_game: key,
            email: item.email,
            random: item.random,
            settings: item.settings,
            status: item.status,
            timestamp: item.timestamp,
            title: item.title,
            type: item.type
          }
          this.listGame.push(game);
        }
      }
        return this.listGame;
    });
  }
  
  goPlay(id){
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    var player ={
      id_game: id,
      player: this.email,
      table: 0,
      status: 'A',
      timestamp: timestamp
    }
    this.partidaService.joinGame(player);

    this.navCtrl.push(JuegoPage);
    const modalElegirCarta = this.modal.create(ElegirCartaPage);
    modalElegirCarta.present();
  }

  play(dataUser){
    console.log(dataUser);
  }


}
