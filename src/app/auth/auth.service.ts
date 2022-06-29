import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  emaiol: string;
  refreshToken: string;
  exporesIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxec800GIbIJrFcV7omO3uQ215qfsoJpo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(error => {
        let errorMessage = 'An unknown error occured!'
        if (!error.error || !error.error.error) {
          return throwError(errorMessage)
        }
        switch (error.error.error.message) {
          case 'EMAIL_EXIST':
            errorMessage = 'This email Exists'
        }
        return throwError(errorMessage);
      }
    ));
  }
}
