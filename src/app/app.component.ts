import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Subscription} from "rxjs";
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isLoading = false;
  error = null;
  private errorSubs: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.errorSubs =  this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })

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
    }, error => {
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy() {
    this.errorSubs.unsubscribe();
  }
}
