import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const TOKEN_STORAGE_KEY = 'token';

@Injectable()
export class TokenService {
  private token$: Subject<string | undefined>;

  constructor() {
    this.token$ = new Subject();
  }

  /**
   * Get token
   * @returns {Subject<string | undefined>}
   */
  get token() {
    return this.token$;
  }

  /**
   * Save token to the localStorage
   * @param {string | undefined} token
   */
  storeToken(token: string | undefined): void {
    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      if (window.localStorage.getItem(TOKEN_STORAGE_KEY)) {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    this.token$.next(token);
  }
}
