import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs";
import {Post} from "./post.model";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);

  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(post => {
      this.isLoading = false;
      this.loadedPosts = post;
    });
    // Send Http request
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
