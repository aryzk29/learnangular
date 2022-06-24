import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, Subject, tap, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};
    this.http.post('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData,
      {
        observe : 'response'
      })
      .subscribe(responseData => {
        console.log(responseData.body);
      }, error => {
        this.error.next(error.message)
      })
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams
      }
      )
      .pipe(map((responseData: {[key: string]: Post}) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }),
        catchError(errorRes => {
          return throwError(errorRes);
        }));
  }

  deletePosts() {
    return this.http.delete('https://learnangular-91a6c-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe: 'events'
      }).pipe(tap(event => {
        console.log(event);

        if(event.type === HttpEventType.Response){
          console.log(event.body)
        }
    }));
  }
}
