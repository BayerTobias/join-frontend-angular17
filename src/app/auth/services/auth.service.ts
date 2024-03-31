import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {}

  async loginWithEmailAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = { username: username, password: password };

    return lastValueFrom(this.http.post(url, body));
  }

  async logout() {
    const url = environment.baseUrl + '/logout/';

    return lastValueFrom(this.http.post(url, {}));
  }

  async createUserWithUsernameAndPassword(user: User) {
    const url = environment.baseUrl + '/create_user/';
    const body = user.toJson();

    return lastValueFrom(this.http.post(url, body));
  }

  async deleteUser() {
    const url = environment.baseUrl + '/delete_user/';

    return lastValueFrom(this.http.get(url));
  }
}
