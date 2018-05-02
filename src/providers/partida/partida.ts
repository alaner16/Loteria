import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { getLocaleNumberSymbol } from '@angular/common';
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
  public game:any;
  constructor(public afd: AngularFireDatabase) { }
  crearPartida(name){
    console.log(name);
    this.afd.list('/game/').push(name);
  }

  createRoom(player){
    this.db.ref('/game/').orderByChild('owner').equalTo(player.player).on('value', (snapshopt) =>{
      //this.db.ref('/game/').orderByChild('status').equalTo('w').on('value', (result) => {
        let game = snapshopt.val();
        console.log(game);
        let ids = Object.keys(game);
        let count = Object.keys(game).length;
        for(var i=0; i< count; i++){
          var key = ids[i];
          var item = snapshopt.child(key).val();
          //console.log(item);
          if(item.status == 'w'){
            this.id = key;
            
          }
        }
      //})
      player.id_game = this.id;
      console.log(player);
      player['last'] = 1;
      this.db.ref('/room/').push(player)
    });
  }

  leaveGame(user){
    let z=true;
    let gg = true;
    let ddd;
    firebase.database().ref('/room/').orderByChild('last').equalTo(1).on('value', (snapshot) => {
        try{
          Object.keys(snapshot.val()).forEach(element => {
            if(snapshot.child(element).val().player == user.email){
              let obj = snapshot.child(element).val();
              ddd = obj;
              obj.status = 'L';
              obj.last = 0;
              this.afd.list('/room/').update(element, obj);
            }
          });
          this.db.ref('/game/').orderByKey().equalTo(ddd.id_game).on('value', result =>{
            let item = result.val();
            let id = Object.keys(item);
            let game = result.child(id[0]).val();
            if (gg) {
              gg=false;
              game.control.players = game.control.players - 1;
              if (game.owner == user.email){
                game.status = "L";
              }else if (game.control.players < game.settings.players){
                  game.status = "w";
                }
                this.afd.list('/game/').update(id[0], game);
            }
          });
        }catch{}
    });
  }


  joinGame(player){
    let z=true;
    let gg = true;
    firebase.database().ref('/room/').orderByChild('id_game').equalTo(player.id_game).on('value', (snapshot) => {
      this.db.ref('/game/').orderByKey().equalTo(player.id_game).on('value', result =>{
        let item = result.val();
        let id = Object.keys(item);
        let game = result.child(id[0]).val();
        if (gg) {
          gg=false;
          game.control.players = game.control.players + 1;
            if (game.control.players >= game.settings.players){
              game.status = "f";
            }
            this.afd.list('/game/').update(id[0], game);
        }
          if(z==true){
              z = false;
              player['last'] = 1;
              this.afd.list('/room/').push(player);
          }
      });
    });
  }

  getPlayers(id_game){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByChild('id_game').equalTo(id_game).on('value', (snapshot) => {
        try{
          let currentPlayers: any;
          let games = snapshot.val();
          let count = Object.keys(games).length;
          console.log(count);
          currentPlayers = count;
          resolve(currentPlayers);
        }catch(err){
          reject(err);
        }
      });
    })
    return promise
  }

  getGame(id_game){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/game/').orderByKey().equalTo(id_game).on('value', result => {
        try{
          let item = result.val();
          let id = Object.keys(item);
          let game = result.child(id[0]).val();
          resolve(game)
        }catch(err){
          reject(err);
        }
      });
    })
    return promise;
  }

  getPublicGames(){
    let promise = new Promise((resolve, reject) => {
      this.db.ref('/game/').orderByChild('type').equalTo('public').on('value',(snapshot)=> {
        let lsGames = [];
        let game: any;
        try{
          let games = snapshot.val();
          //console.log(games);
          let ids = Object.keys(games);
          let count = Object.keys(games).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            if(item.status == 'w'){
                game = {
                id_game: key,
                owner: item.owner,
                random: item.random,
                settings: item.settings,
                control: item.control,
                status: item.status,
                timestamp: item.timestamp,
                title: item.title,
                type: item.type
              }
              lsGames.push(game);
            }
          }
          resolve(lsGames);
        }catch(err){
          reject(err);
        }
      });

    })
    return promise;
  }

  getRooms(player){
    let promise = new Promise((resolve, reject) =>{
      firebase.database().ref('/room/').orderByChild('id_game').equalTo(player.id_game).on('value', (snapshot) => {
        let z;
        let lsRooms = [];
        try{
          let rooms = snapshot.val();
          //console.log(games);
          let ids = Object.keys(rooms);
          let count = Object.keys(rooms).length;
          for(var i=0; i< count; i++){
            let key = ids[i];
            let item = snapshot.child(key).val();
            lsRooms.push(item);
          }
          resolve(lsRooms);
        }catch(err){
          reject(err);
        }
      });
    })
    return promise;
  }

}





