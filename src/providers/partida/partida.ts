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
    this.afd.list('/game/').push(name);
  }
  update_card(element, obj){
    this.afd.list('/game/').update(element, obj);
  }

  get_my_game(player){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByChild('player').equalTo(player).on('value', (snap) => {
        try {
          let game = snap.val();
          let ids = Object.keys(game);
          let count = Object.keys(game).length;
          let m:any;
          for(var i=0; i< count; i++){
            var key = ids[i];
            var item = snap.child(key).val();
            //console.log(item);
            if(item.status == 'A'){
              m = item.id_game;
              resolve(m);
            }
          }
        }catch(err){
          reject(err);
        }

      });
    })
    return promise


  }

  createRoom(player){
    let z = true;
    this.db.ref('/game/').orderByChild('owner').equalTo(player.player).on('value', (snapshopt) =>{
      if(z==true){
        z = false;
        let game = snapshopt.val();
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
      player['last'] = 1;
      console.log('creando la sala');
      this.db.ref('/room/').push(player);
      }
    });
  }

  leaveGame(user){
    let z=true;
    let gg = true;
    let control_room = true;
    let ddd;
    firebase.database().ref('/room/').orderByChild('last').equalTo(1).on('value', (snapshot) => {
        try{
          Object.keys(snapshot.val()).forEach(element => {
            if(snapshot.child(element).val().player == user.email){
              let obj = snapshot.child(element).val();
              ddd = obj;
              obj.status = 'L';
              obj.last = 0;
              if(control_room == true){
                control_room = false;
              console.log('estoy en leave room');
              this.afd.list('/room/').update(element, obj);
              }
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
                console.log('Saliendo de juego en servicio');
                console.log('estoy en leave game');
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
      let df = firebase.database().ref('/room/').orderByChild('id_game').equalTo(id_game);
      return this.afd.list(df).snapshotChanges();
  }

  getGame(id_game){
    let promise = new Promise((resolve, reject) =>{
      this.db.ref('/game/').orderByKey().equalTo(id_game).on('value', result => {
        try{
          let item = result.val();
          let id = Object.keys(item);
          let game = result.child(id[0]).val();
          game.id = id[0];
          resolve(game)
        }catch(err){
          reject(err);
        }
      });
    })
    return promise;
  }

  updateTablesGame(id_game, id_table){

      let control = true;
      this.db.ref('/game/').orderByKey().equalTo(id_game).on('value', result => {
        try{
          if(control == true){
          control = false;
          let item = result.val();
          let id = Object.keys(item);
          let game = result.child(id[0]).val();
          game.id = id[0];
          console.log(id_table);

          game.control.tables.push(id_table);

          this.afd.list('/game/').update(id[0], game);
          control = false;
          console.log(control);
          }
          console.log('no entre en update tables');
        }catch(e){console.log(e)}

      });
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
            if(item.status == 'A'){
            lsRooms.push(item);
            }
          }
          resolve(lsRooms);
        }catch(err){
          reject(err);
        }
      });
    })
    return promise;
  }

  get_my_room(player){
    let promise = new Promise((resolve, reject) => {
      firebase.database().ref('/room/').orderByChild('player').equalTo(player).on('value', (snap) => {
        try {
          let game = snap.val();
          let ids = Object.keys(game);
          let count = Object.keys(game).length;
          let m:any;
          for(var i=0; i< count; i++){
            var key = ids[i];
            var item = snap.child(key).val();
            //A diferencia de get_my_game aquí se retorna el objeto completo
            if(item.status == 'A'){

              resolve(item);
            }
          }
        }catch(err){
          reject(err);
        }

      });
    })
    return promise


  }

  update_my_room(room){
    let z=true;
    this.db.ref('/room/').orderByChild('player').equalTo(room.player).on('value', (snapshot) => {
      try{
        let game = snapshot.val();
        let ids = Object.keys(game);
        let count = Object.keys(game).length;
        let m:any;
        for(var i=0; i< count; i++){
          var key = ids[i];
          var item = snapshot.child(key).val();
          //A diferencia de get_my_game aquí se retorna el objeto completo
          if(item.status == 'A'){
            if(z == true){
              z=false;
            console.log('update player in room');
            //console.log(room);
            //console.log(key);
            this.afd.list('/room/').update(key, room);
            }
          }
        }
      }catch(e){console.log(e)}

    });
  }

}





