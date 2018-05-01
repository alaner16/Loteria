import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class TableProvider {
  private db = firebase.database();
  constructor(public afd: AngularFireDatabase) { }
  getCards(){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/table/').on('value', (snapshot) =>{
        try{
          let tables = snapshot.val();
          resolve(tables);
        }catch(err){
          reject(err);
        }
      })
    })
    return promise
  }
}