import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/*
  Generated class for the PartidaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartidaProvider {
  result :any;
  listGame?: any;
  correo ='hola';
  private db = firebase.database();
  data: any;
  id: any;
  constructor(public afd: AngularFireDatabase) { }
  crearPartida(name){
    this.afd.list('/game/').push(name);
  }

  createRoom(player){
    this.db.ref('/game/').orderByChild('email').equalTo(player.owner).on('value', (snapshopt) =>{
      //this.db.ref('/game/').orderByChild('status').equalTo('w').on('value', (result) => {
        let game = snapshopt.val();
        console.log(game);
        var ids = Object.keys(game);
        var count = Object.keys(game).length;
        for(var i=0; i< count; i++){
          var key = ids[i];
          var item = snapshopt.child(key).val();
          //console.log(item);
          if(item.status == 'w'){
            this.id = key;
            console.log(this.id);
          }
        }
      //})
      player.id_game = this.id;
      console.log(player);
      this.db.ref('/room/').push(player)
    });
  }

  joinGame(player){
    let z=true;
   firebase.database().ref('/room/').orderByChild('id_game').equalTo(player.id_game).on('value', (snapshot) => {
      try{
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);
      var key = arr2[0];
      console.log(key);
      //console.log('barrido '+key)
      }catch(e){//console.log('error')
    }
      if(z==true){
      if (key!=null){
        z=false;
        //console.log('entre');
        this.afd.list('/room/').push(player);
      }else{
        z=false;
       this.afd.list('/room/').push(player);        
      }}
    });
  }

  getGames(callback){
    let lsGames:any;
    this.db.ref('/game/').orderByChild('type').equalTo('public').on('value',(snapshot)=> {
    try{
    var arr = snapshot.val();
    var arr2 = Object.keys(arr);
    var key = arr2[0];
  
    lsGames = arr}
    catch(e){}
    callback(snapshot);
    });
  }
}




 
