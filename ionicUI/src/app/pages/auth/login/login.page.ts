import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  NavController: any;
  
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public router:Router,
    private storage: NativeStorage,
  ) { }

  ngOnInit() {
  }
  manufacture_page() {
    this.router.navigateByUrl('/manufacture');
    console.log("hi")
}
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }
  decodetoken(res){
       var decoded=jwt_decode(res.token);
        if(decoded.role=="admin")
        {
          //  this.router.navigate(['manufacture']);
          this.manufacture_page()
          // this.NavController.push('ManufacturePage');
        }
      }
  login(form: NgForm) {
    this.authService.userlogin("nihal@gmail.com", "qwert")
    .subscribe(
      res => {
        this.alertService.presentToast("Logged In");
        // this.navCtrl.navigateRoot('src\app\admin');
        console.log(res)
        localStorage.setItem('token', res.token)
        this.decodetoken(res)

      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        // this.navCtrl.navigateRoot('/landing');
        
      }
    );
  }
}
