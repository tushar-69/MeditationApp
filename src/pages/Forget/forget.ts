import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,LoadingController ,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';


@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html'
})
export class ForgetPage  {


	public formforget:FormGroup;
    private isFormSubmitted:boolean=false;
  
    constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

	}
    ngOnInit() {
      this.formforget = this.formBuilder.group({
      emailId: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
   }

   get emailId() {
     return this.formforget.get('emailId');
	}

	FORGET()
  {
  
  this.isFormSubmitted=true
  	if(!this.formforget.valid)
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
      let options = new RequestOptions({ headers : headers  });
  
 this.http.post('https://meditationnodeapi.herokuapp.com/forget', this.formforget.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
             console.log('POST Response:', response);
                 loading.dismiss();
                 this.presentToast();

          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
      }
	} 
  showBasicAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Unauthorized',
      subTitle: 'Please Enter registered emailID ',
      buttons: ['OK']
    });
    basicAlert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Please Check Your Email Address to reset password',
    duration: 3000,
    position: 'center'
  });

  toast.present();
	} 
}
