import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { HTTP} from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
// import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
// const JWT_Module_Options: JwtModuleOptions = {
//   config: {
  
//   }
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // JwtModule,
    // JwtModule.forRoot(JWT_Module_Options),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['example.com'],
    //     blacklistedRoutes: ['example.com/examplebadroute/']
    //   }
    // })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}