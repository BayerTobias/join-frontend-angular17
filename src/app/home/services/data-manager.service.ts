import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  private http = inject(HttpClient);

  constructor() {}

  getData() {
    console.log('hallo');
  }

  async getTodos() {
    const url = environment.baseUrl + '/tasks/';

    return lastValueFrom(this.http.get(url));
  }
}
