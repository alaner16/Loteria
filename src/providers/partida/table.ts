import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class TableProvider {
  private db = firebase.database();
  constructor(public afd: AngularFireDatabase) { }
  getTables(){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/table/').on('value', (snapshot) =>{
        try{
          let tables = snapshot.val();
          
          let allTables = [];
          for(var i = 0; i<tables.length; i++){
            let t = [];
            for(var j = 0; j < 4; j++){
              t.push(tables[i].splice(0,4));
            }
            allTables.push(t);
          }
    
          resolve(allTables);
        }catch(err){
          reject(err);
        }
      })
    })
    return promise
  }
}