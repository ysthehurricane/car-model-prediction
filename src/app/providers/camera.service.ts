import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private transfer: FileTransfer,private camera: Camera) { }

  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA, false);
  }
  
  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

    getImage(pictureSourceType, crop = false, quality = 20, allowEdit = true, saveToAlbum = false){
      const options = {
        quality : quality,
        allowEdit: allowEdit,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: pictureSourceType,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: saveToAlbum,
        correctOrientation:true
      };

        return this.camera.getPicture(options).then(imageData => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      return base64Image;
    }, error => {
      console.log('CAMERA ERROR -> ' + JSON.stringify(error));
    });
   }

}
