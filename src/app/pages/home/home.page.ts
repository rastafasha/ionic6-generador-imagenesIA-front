import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts: Post[] = [];
  loading: boolean = false;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }
  //se llama cada vez que la persona entra a la pagina
  ionViewWillEnter(){
    this.getPosts();
  }

  getPosts(){
    // this.loading = true;
    // setTimeout(()=>{
    //   this.loading = false;
    //   this.posts = Posts;//llama la data guardad en assets

    // }, 2000);
    this.posts = Posts;
    console.log(this.posts);
  }

  doRefresh(event:any){
    setTimeout(()=>{
      this.getPosts();
      event.target.complete();

    }, 2000)
  }

  async showPostDetail(post: Post){
    await this.utilsService.presentModal({
      component: PostDetailComponent,
      componentProps: {post},
      cssClass: 'modal-full-size'
    })
  }

}
