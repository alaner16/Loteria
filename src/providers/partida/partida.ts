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
  paja?: any;
  correo ='hola';
  constructor(public afd: AngularFireDatabase) { }
    crearPartida(name){
    console.log(name);
    this.afd.list('/partida/').push(name);
   }
   getItem(id){
    this.paja = this.getfn(id);
    console.log(this.paja);
    return this.paja;
 }
getfn(id){
var query = firebase.database().ref('/partida/').orderByChild('id').equalTo(id);
query.on('value', (snapshot) => {
  var arr = snapshot.val();
  var arr2 = Object.keys(arr);
  var key = arr2[0];
  var paja=snapshot.child(key).val();
  this.paja=paja;
});
return this.paja;
}
}
