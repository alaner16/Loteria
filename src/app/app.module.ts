import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Loteria } from './app.component';
import { NgxErrorsModule } from  '@ultimate/ngxerrors';
// Paginas
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { JuegoPage } from '../pages/juego/juego';
import { UnirsePage } from "../pages/unirse/unirse";
import { CrearPartidaPage } from "../pages/crear-partida/crear-partida";
import { RecordPage } from "../pages/record/record";
import { ConfigPage } from "../pages/config/config";
import { LoginPage } from "../pages/login/login";
import { RegistroPage } from "../pages/registro/registro";
import { ElegirCartaPage } from '../pages/elegir-carta/elegir-carta';
import { PerfilPage } from '../pages/perfil/perfil';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Server modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

//Services
import { AuthService } from '../services/auth.service';
import { PartidaProvider } from '../providers/partida/partida';

export const firebaseConfig = {
  fire: {
    apiKey: "AIzaSyAzc86-ph5SfRHm22l0vNZDSUcixAk_ElM",
    authDomain: "loteria-88975.firebaseapp.com",
    databaseURL: "https://loteria-88975.firebaseio.com",
    projectId: "loteria-88975",
    storageBucket: "loteria-88975.appspot.com",
    messagingSenderId: "477126197467"
  }
}

@NgModule({
  declarations: [
    Loteria,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JuegoPage,
    UnirsePage,
    ConfigPage,
    RecordPage,
    CrearPartidaPage,
    LoginPage,
    RegistroPage,
    ElegirCartaPage,
    PerfilPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(Loteria),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Loteria,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JuegoPage,
    UnirsePage,
    ConfigPage,
    RecordPage,
    CrearPartidaPage,
    LoginPage,
    RegistroPage,
    ElegirCartaPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    AngularFireAuth,
    PartidaProvider
  ]
})
export class AppModule {}
