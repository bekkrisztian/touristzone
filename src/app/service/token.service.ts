import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  ACCESS_TOKEN = 'authorization_code';
  REFRESH_TOKEN = 'refresh_token';

  constructor() { }

  getToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  saveToken(token): void {
    localStorage.setItem(this.ACCESS_TOKEN, token)
  }

  saveRefreshToken(refreshToken): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken)
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
