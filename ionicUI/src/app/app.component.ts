import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
  ];
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    // private authService: AuthService,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      // this.authService.getToken();
    });
  }
  }