import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};
    this.http.post('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      })
  }

  fetchPosts() {
    return this.http.get('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(map((responseData: {[key: string]: Post}) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }));
  }

  deletePosts() {
    return this.http.delete('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
  }
}
