import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { ImageaiService } from 'src/app/services/imageai.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';
import { surpriseMePrompts } from 'src/assets/data/surprise-promts';

@Component({
  selector: 'app-create-images',
  templateUrl: './create-images.page.html',
  styleUrls: ['./create-images.page.scss'],
})
export class CreateImagesPage implements OnInit {

  form = new FormGroup({
    prompt: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  userPosts: Post[]=[];

  constructor(
    private utilsService: UtilsService,
    private imageAiService: ImageaiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userPosts = Posts;
  }

  submit(){

    let prompt = this.form.value.prompt as string;
    this.utilsService.presentLoading();
    this.imageAiService.sendPrompt(prompt).subscribe({
      next: (res:any)=>{
      //  console.log(res);

       let post: Post = {
        prompt,
        images: res.images,
        name: this.form.value.name as string
       }

       this.showPostDetail(post);

       this.utilsService.dissmissLoading();
      }
    });
  }

  randomPrompt(){
    let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    let randomElement = surpriseMePrompts[randomIndex];
    this.form.controls.prompt.setValue(randomElement);
  }

  async showPostDetail(post: Post){
    await this.utilsService.presentModal({
      component: PostDetailComponent,
      componentProps: {post},
      cssClass: 'modal-full-size'
    })
  }

}
