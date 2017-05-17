import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { TokenService } from './token.service';

const AUTHORIZATION_HEADER = 'Authorization';

@Injectable()
export class MyRequestOptions extends BaseRequestOptions {

  constructor(private tokenService: TokenService) {
    super();

    this.tokenService.token.subscribe((token: string | undefined) => {
      if (token) {
        this.headers.set(AUTHORIZATION_HEADER, `Bearer ${token}`);
      } else {
        if (this.headers.has(AUTHORIZATION_HEADER)) {
          this.headers.delete(AUTHORIZATION_HEADER);
        }
      }
    });
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: MyRequestOptions};
