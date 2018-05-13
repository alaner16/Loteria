import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { firebaseConfig } from '../../app/app.module';
import * as firebase from 'firebase';
import { Content } from 'ionic-angular';
import { FormsModule, FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { PartidaProvider } from '../../providers/partida/partida';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild("content") content: Content;   
  myForm: FormGroup;
  message: string = "";
  messages = [];
  public user: any;
  public email: any;
  public date: any = new Date();
  public gameid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private fb: FormBuilder, private partida: PartidaProvider) {
    this.user= firebase.auth().currentUser;
    this.email = this.user.email;
    this.partida.getlastroom(this.email).then(response=>{
      this.gameid = response['id_game'];
    }).catch(err =>{
      console.log(err);
    });
    
    this.getMessages();
    this.myForm = this.fb.group({
      'message': ['', Validators.required]
    });
  }

  getMessages(){
    this.partida.getlastroom(this.email).then(response =>{
      let currentRoom: any = [];
      currentRoom = response;
      let game = currentRoom.id_game;
      var messagesRef = firebase.database().ref('/messages/').orderByChild("idgame").equalTo(game);
      messagesRef.on("value", (snap) => {
        var data = snap.val();
        this.messages = [];
        for(var key in data){
          this.messages.push(data[key]);
        }
        this.content.scrollToBottom(0);
      });
    }).catch(err =>{
      console.log(err);
    })

  }

  
 ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){
    this.date = Date.now();
    console.log();
    var messagesRef = firebase.database().ref().child("messages");
    messagesRef.push({mensaje: this.message, nombre: this.email, hora: this.date, idgame: this.gameid });
    this.message = "";
  }
  cerrarModal(){
    this.view.dismiss();
  }

}
