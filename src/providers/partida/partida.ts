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

  constructor(public afd: AngularFireDatabase) { }
    crearPartida(name){
    this.afd.list('/game/').push(name);
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




 
