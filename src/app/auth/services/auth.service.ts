import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async loginWithEmailAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = { username: username, password: password };

    return lastValueFrom(this.http.post(url, body));
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
