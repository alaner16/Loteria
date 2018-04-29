import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
* Generated class for the PerfilPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-perfil',
 templateUrl: 'perfil.html',
})
export class PerfilPage implements OnInit {
auth:any;
users:any;
i:any;
//Nombre:any;Apodo:any;Ciudad:any;FechaNacimiento:any;
Perfil={Correo: '',Nombre:'',Apodo:'',FechaNacimiento:'',Ciudad:''}

 constructor(public afd:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private perfilService:PerfilProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
   this.i=true;
   this.users= firebase.auth().currentUser;
   this.Perfil.Correo=this.users.email;

   if(this.i==true){
   this.i=false;
   this.perfilService.getPerfil((this.users.email),(result) => {
     if(result!=null)this.Perfil=result;
     //console.log(this.Perfil);
   });}
 }

 presentToast() {
 let toast = this.toastCtrl.create({
   message: 'Datos guardados exitosamente',
   duration: 1500,
   position: 'top'
 });

 toast.onDidDismiss(() => {
   this.navCtrl.push(HomePage);
 });

 toast.present();
}

 save(){
   this.perfilService.crearPerfil(this.Perfil);
 }
 ionViewDidLoad() {
   console.log('ionViewDidLoad PerfilPage');
 }

 ngOnInit(){
   
 }
}