import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailClientService {

  constructor(private httpClient: HttpClient) { }

  // get email info and set params to notify the server of the action that needs to be performed
  sendEmail(emailSender: string, subject: string, message: string): Observable<string[]> {
    const params = new HttpParams()
      .set('action', 'sending_email');

    const req = this.httpClient.post<string[]>('http://denis-coccodi-angular.stackstaging.com/ngBackend/index.php',
      {
        recipient: 'denis@deniscoccodi.com',
        sender: emailSender,
        subject: subject,
        message: message
      },
      {
        params: params,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return req;
  }

}
