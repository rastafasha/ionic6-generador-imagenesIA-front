import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  @Input() post!: Post;
  @Input() isModal!: boolean;

  selectedImage: string ='';

  constructor(
    public platform: Platform,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.selectedImage = this.post.images[0]; //selecciona la primera imagene de la composicion
  }

  saveImage(){
    if(this.platform.is('capacitor')){
      //compartir (necesario instalar las depdendencias de android e ios npm i @capacitor/ios y npm i @capacitor/android )
      this.utilsService.shareImageInMobile(this.selectedImage);
    }else{
      this.utilsService.saveImageInWeb(this.selectedImage)
    }
  }

  copyPromptToClipboard(){
    this.utilsService.copyToClipboard(this.post.prompt);
    this.utilsService.presentToast({
      message: 'Copiado a portapapeles',
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary'
    })
  }

}
