import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../services/auth.service';
import { NativeAudio } from '@ionic-native/native-audio';
//import { ConfigPage } from '../pages/config/config';

@Component({
  templateUrl: 'app.html'
})
export class Loteria {
  rootPage:any = TabsPage;
  onSuccessPlaying:any;onError:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService, private nativeAudio: NativeAudio) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeAudio.preloadComplex('rolilla', 'assets/sounds/rolilla.mp3',1,1,0).then(this.onSuccessPreloading, this.onError);
      //this.nativeAudio.play('rolilla');
    //this.nativeAudio.loop('rolilla');
    //this.nativeAudio.setVolumeForComplexAsset('rolilla',0.5);
    });
  }
  onSuccessPreloading = (data) => {
    console.log('success preloading', data);
    this.nativeAudio.play('rolilla').then(this.onSuccessPlaying, this.onError);
    this.nativeAudio.loop('rolilla');
  }
}
