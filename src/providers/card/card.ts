import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class CardProvider {
  private db = firebase.database();
  
  constructor(public afd: AngularFireDatabase) { }

  getCards(){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/card/').on('value', (snapshot) =>{
        try{
          let cards = snapshot.val();
          resolve(cards);
        }catch(err){
          reject(err);
        }
      })
    })
    return promise
  }
}