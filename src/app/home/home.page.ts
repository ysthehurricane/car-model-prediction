import { Component } from '@angular/core';
import { AlertController, LoadingController  } from '@ionic/angular';
import { CameraService } from '../providers/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    private img : any = "";

  constructor(private cameraservice: CameraService,
    public alertController: AlertController,
    public loadingController: LoadingController) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();   
  }

  async presentLoadingDismiss(){
    const loading = await this.loadingController.create({});
    return await loading.dismiss();
  } 

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  takeCamera()
  {
       
      this.cameraservice.getPictureFromCamera().then(data =>{   
        this.img = data;         
        }).catch(error =>{
          this.presentAlert(error);
        });
  }

  takeFromLibrary()
  {  
        this.cameraservice.getPictureFromPhotoLibrary().then(data =>{
          this.img = data; 
        }).catch(error =>{
          this.presentAlert(error);
        });
  }

}
