import {Component, Input, OnInit} from '@angular/core';
import {UserPostClass} from "../post-page-class";

/**
 * Generated class for the PostPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'post-page',
  templateUrl: 'post-page.html'
})
export class PostPageComponent implements OnInit {

  userPosts: UserPostClass[];

  constructor() {
    if(!this.arrayUsersPosts) {
      this.userPosts = this.arrayUsersPosts;
    }
  }

  @Input() arrayUsersPosts: UserPostClass[];

  ngOnInit(): void {
    console.log("this is posts component");
    console.log(this.arrayUsersPosts);
    this.userPosts = this.arrayUsersPosts;
  }

}
