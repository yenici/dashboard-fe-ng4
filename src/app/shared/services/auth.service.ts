import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TokenService } from './token.service';

const AUTH_SERVICE_PATH = 'http://dev.dashboard.pp.ciklum.com/api/authorize';
const AUTHORIZATION_SERVICE_PATH = 'http://dev.dashboard.pp.ciklum.com/api/authorize/userinfo';

@Injectable()
export class AuthService {
  private onAuthStateChanged$ = new BehaviorSubject<string | undefined>(void 0);

  /**
   * Create instance of the service
   * @param {Http} http
   * @param {TokenService} tokenService
   */
  constructor(private http: Http, private tokenService: TokenService) {}

  /**
   * Return observable to control auth status
   * @returns {BehaviorSubject<string>}
   */
  get onAuthStateChanged(): BehaviorSubject<string | undefined> {
    return this.onAuthStateChanged$;
  }

  /**
   * Sign in
   * @param {string} email
   * @param {string} password
   */
  public signIn(email: string, password: string) {
    this.http
      .post(AUTH_SERVICE_PATH, { Email: email,  Password: password })
      .map((res: Response) => res.json().Token)
      .do(token => this.tokenService.storeToken(token))
      .switchMap(() => this.http.get(AUTHORIZATION_SERVICE_PATH).map((res: Response) => {
        this.onAuthStateChanged$.next(res.json());
      }))
      .catch((err: Response | any) => this.errorHandler(err))
      .subscribe();
  }

  /**
   * Sign out
   */
  public signOut(): void {
    this.tokenService.storeToken(void 0);
  }

  /**
   * Handle authentication response
   * @param {Response} res
   */
  private authHandler(res: Response): void {
    const token = res.json().Token;
    this.tokenService.storeToken(token);
  }

  /**
   * Handle authentication error
   * @param {Response | any} err
   * @returns {ObservableInput<string>}
   */
  private errorHandler(err: Response | any): ObservableInput<string> {
    this.tokenService.storeToken(void 0);

    let error: object;
    if (err instanceof Response) {
      error = err.json();
    } else {
      error = { ErrorMessage: err.message ? err.message : err.toString() };
    }
    console.log('Error', error); // TODO: Error handling
    return Observable.throw(error);
  }
}
