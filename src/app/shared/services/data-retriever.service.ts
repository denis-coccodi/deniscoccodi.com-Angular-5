import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DataRetrieverService {

  constructor(private _httpClient: HttpClient) {}

  // import cv data from the server
  importCvData() {
    const params = new HttpParams()
      .set('action', 'fetchCvData');

    return this._httpClient.get<any[]>(
    'https://deniscoccodi.com/ngBackend/index.php',
      {
        params: params
      }
    );
  }

  // import project data from the server
  importProjectData() {
    const params = new HttpParams()
      .set('action', 'fetchProjData');

    return this._httpClient.get<any[]>(
      'https://deniscoccodi.com/ngBackend/index.php',
      {
        params: params
      }
    );
  }
}
