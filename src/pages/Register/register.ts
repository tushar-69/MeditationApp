import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController ,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {HomePage} from '../home/home'


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage  {
	 
   public registerFormData:FormGroup;
     private isFormSubmitted:boolean=false;
       public showPass :boolean= false;
         public type = 'password';


  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,public formBuilder:FormBuilder,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

     }
  ngOnInit() {
      this.registerFormData = this.formBuilder.group({
      		firstname: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      		lastName: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      		country: ['',[Validators.required,Validators.pattern('^[A-Z][a-z]+( [A-Z][a-z]+)*$')]],
      		emailId: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      		password: ['',[Validators.required,]],
      		mobileNumber: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
    		});
   		}

   		get firstname() {
     		return this.registerFormData.get('firstname');
		} 
		get lastName() {
     		return this.registerFormData.get('lastName');
		} 
		get country() {
     		return this.registerFormData.get('country');
		} 
		get emailId() {
     		return this.registerFormData.get('emailId');
		} 
		get password(){
		     		return this.registerFormData.get('password');
		}
		get mobileNumber(){
		     		return this.registerFormData.get('mobileNumber');
		}

 
  SignUp(){
debugger;
	this.isFormSubmitted=true
  	if(!this.registerFormData.valid)
  	{
      return;
  	}else{
      let loading = this.loadingCtrl.create({
    	          	content: 'Sign Up...',
    				spinner:'ios'
  		});

  			loading.present();
  			this.isFormSubmitted=false;
            let headers = new Headers();

		 headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers : headers  });
 
 this.http.post('https://meditationnodeapi.herokuapp.com/register', this.registerFormData.value,options).pipe(
              map(res => res.json())
          ).subscribe(response => {
             console.log('POST Response:', response);
                 loading.dismiss();
                 this.presentToast();
                 this.navCtrl.push(HomePage);

          },      err => {
                 loading.dismiss();
                 this.showBasicAlert();
      });
    }
}
    showBasicAlert() {
    let basicAlert = this.alertCtrl.create({
      title: 'Unauthorized',
      subTitle: 'emailId is allready registered',
      buttons: ['OK']
    });
    basicAlert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Registration Successfull',
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