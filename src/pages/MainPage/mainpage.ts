import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController, MenuController } from 'ionic-angular';
import {Http,Headers,RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html'
})
export class MainPage {

    constructor(public navCtrl: NavController,public alertCtrl:AlertController,private http : Http,menuCtrl:MenuController) {

    //	this.articles = ['article 1', 'article 2', 'article 3', 'article 4', 'article 5'];
	}

/*	ionViewDidLoad() {

			this.events.publish('articleMenu:populate', this.articles);

			this.events.subscribe('articleMenu:change', (index) => {this.showArticle(index);});

			this.menuCtrl.enable(true, 'ArticleMenu');
	}

	ionViewWillUnload(){
	    	// disable the menu when you leave this page
	   this.menuCtrl.enable(false, 'ArticleMenu');
	}
	showArticle(index){
	    // do something with the article here, e.g. display it
	   console.log('Show article:', this.article[index]);
	    }*/
}
