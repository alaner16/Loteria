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
          let t = [];
          t.push(tables.splice(0,4));
          t.push(tables.splice(4,4));
          t.push(tables.splice(8,4));
          t.push(tables.splice(12,4));
          t.push(tables.splice(16,4));
          resolve(t);
        }catch(err){
          reject(err);
        }
      })
    })
    return promise
  }
}
