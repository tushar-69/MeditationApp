import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController ,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RegisterPage} from '../Register/register';
import {ForgetPage} from '../Forget/forget';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {MainPage} from '../MainPage/mainpage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

     public formdata:FormGroup;
     private isFormSubmitted:boolean=false;
     public showPass :boolean= false;
     public type = 'password';

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

     }
  ngOnInit() {
      this.formdata = this.formBuilder.group({
      username: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['',[Validators.required,Validators.maxLength(15)]],
    });
   }

get username() {
     return this.formdata.get('username');
} 
 
 get password() {
     return this.formdata.get('password');
}  

  SignIn()
  {
  //	console.log('sdssdsdsd');
  //	console.log(this.username.value);
  //	console.log('sdssdsdsd');
  this.isFormSubmitted=true
  	if(!this.formdata.valid)
  	{
      return;
  	}else{
      let loading = this.loadingCtrl.create({
    content: 'Logging in...',
    spinner:'ios'
  });

  loading.present();
  			this.isFormSubmitted=false;
            let headers = new Headers();

		 headers.append('Content-Type', 'application/json');
  //  headers.append('Access-Control-Allow-Origin','http://localhost:8100');
  	 let options = new RequestOptions({ headers : headers  });
 // let headers = {
 //            'Content-Type': 'application/json'
 //        };
  //    	this.http.post('https://meditationnodeapi.herokuapp.com/login', data,options).pipe(
  //      	    map(res => res.json())
  //      	).subscribe(response => {
  //         	 console.log('POST Response:', response);
  //      	});
  //  	}
 //debugger
 this.http.post('https://meditationnodeapi.herokuapp.com/login', this.formdata.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
             console.log('POST Response:', response);
                 loading.dismiss();
                 this.presentToast();
                  this.navCtrl.push(MainPage);

          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
      }
	}
	Register(){
//debugger;
		  this.navCtrl.push(RegisterPage);
	}

  Forget(){

     this.navCtrl.push(ForgetPage);
  }
  showBasicAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Unauthorized',
      subTitle: 'That email doesnt seem to have a Meditation account. Mind trying again ?',
      buttons: ['OK']
    });
    basicAlert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User login successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}
showPassword() {
    this.showPass = !this.showPass;

    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}