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
  crear_request_check(obj){
    this.afd.list('/request_check_room/').push(obj);
  }
  crear_request_full(obj){
    this.afd.list('/request_full_room/').push(obj);
  }
  crear_request_blast(obj){
    this.afd.list('/request_blast_room/').push(obj);
  }
  crear_request_square(obj){
    this.afd.list('/request_square_room/').push(obj);
  }
  crear_request_center(obj){
    this.afd.list('/request_center_room/').push(obj);
  }
  createGame(game){
    let promise = new Promise((resolve,reject)=>{
      this.afd.list('/game/').push(game);
      this.get_my_game(game).then(response =>{
        resolve(response);
        //console.log(this.tables);
      }).catch(err =>{
        reject(err);
      })
    })
  }

  getlastgame(player){
    let promise = new Promise((resolve, reject)=>{
      let control = true;
      this.db.ref('/game/').orderByChild("owner").equalTo(player).limitToLast(1).on('value',(snap)=>{
        try{
          if(control == true){
          control = false;
          console.log("en last game service");
          let lastGame = snap.val();
          let id = Object.keys(lastGame);
          let game = snap.child(id[0]).val();
          game.id = id[0];
          console.log(game);
          console.log(game.id);
          resolve(game);
          }
        }catch(err){ reject(err)}
      });
    })
    return promise;
  }

  getlastroom(player){
    let promise = new Promise((resolve, reject)=>{
      let control = true;

      this.db.ref('/room/').orderByChild("player").equalTo(player).limitToLast(1).on('value', (snap)=>{
        try{
          if(control == true){
          control = false;
          console.log("en last room service");
          let lastRoom = snap.val();
          let id = Object.keys(lastRoom);
          let room = snap.child(id[0]).val();
          room.id = id[0];
          console.log(room);
          console.log(room.id);
          resolve(room);
          }
        }catch(err){ reject(err)}
      })
    })
    return promise
  }

  update_card(element, obj){
    this.afd.list('/game/').update(element, obj);
  }
  update_wins(id_game, game){
    this.afd.list('/game/').update(id_game, game);
  }
  update_stats(obj){
    this.afd.list('/room/').update(obj.id, obj);
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

  newRoom(player, game){
    console.log(game.id);
    player.id_game = game.id;
    player['last'] = 1;
    console.log('creando la sala');
    this.db.ref('/room/').push(player);
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
    let gamecontrol = true;
    let roomcontrol = true;
    console.log(user);
    this.db.ref('/game/').orderByChild("owner").equalTo(user.email).limitToLast(1).on('value',(snap)=>{
      try{
        if(gamecontrol == true){
        gamecontrol = false;
        console.log("en leave game method");
        let lastGame = snap.val();
        let id = Object.keys(lastGame);
        let game = snap.child(id[0]).val();
        game.id = id[0];
        console.log(game);
        game.status = "L"
        this.afd.list('/game/').update(id[0], game);
        }
      }catch(err){
        console.log(err);
      }
    });
    this.db.ref('/room/').orderByChild("player").equalTo(user.email).limitToLast(1).on('value', (snap)=>{
      try{
        if(roomcontrol == true){
        roomcontrol = false;
        console.log("en leave room method");
        let lastRoom = snap.val();
        let id = Object.keys(lastRoom);
        let room = snap.child(id[0]).val();
        //room.id = id[0];
        console.log(room);
        room.status = "L";
        this.afd.list('/room/').update(id[0], room);
        }
      }catch(err){
        console.log(err);
      }
    })
    
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
      this.db.ref('/room/').orderByChild('id_game').equalTo(id_game).on('value',(snapshot)=> {
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
            console.log(item);
            if(item.last == 1){
              console.log(item.last);
                game = {
                id: key,
                id_game: id_game,
                player: item.player,
                stats: item.stats,
                table: item.table,
                status: item.status,
                timestamp: item.timestamp
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
              item.id = key;
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

  updateUserTable(player, id_table){
      let control = true;
      console.log(player.id_game);
      firebase.database().ref('/room/').orderByKey().equalTo(player.id).on('value', (snap) => {
        try {
        if(control == true){
          control = false;
          let room = snap.val();
          let ids = Object.keys(room);
          var key = ids[0];
          var updateUser = snap.child(key).val();
          //Se actualiza el item tabla del objeto room_player
          updateUser.table = id_table

          console.log(updateUser)
          this.afd.list('/room/').update(key, updateUser);
        }
        }catch(err){
          console.log(err);
        }
    });
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





