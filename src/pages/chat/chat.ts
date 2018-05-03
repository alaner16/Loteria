import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { firebaseConfig } from '../../app/app.module';
import * as firebase from 'firebase';
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
  @ViewChild("content") content: any;
  
  message: string = "";
  messages = [];
  public user: any;
  public email: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.getMessages();
    this.user= firebase.auth().currentUser;
    this.email = this.user.email;
  }

  getMessages(){
    var messagesRef = firebase.database().ref().child("messages");
    messagesRef.on("value", (snap) => {
      var data = snap.val();
      for(var key in data){
        this.messages.push(data[key]);
      }
      console.log(this.email);
      this.scrollToBottom();
    });
  }

  scrollToBottom(){
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0, contentEnd, 300);
  }
  //ionViewDidLoad() {
    //console.log('ionViewDidLoad ChatPage');
  //}

  sendMessage(){
    var messagesRef = firebase.database().ref().child("messages");
    messagesRef.push({mensaje: this.message, nombre: this.email });
    this.message = "";
  }
  cerrarModal(){
    this.view.dismiss();
  }

}
