import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../services/core.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailClientService } from './email-client.service';

@Component({
  selector: 'app-email-client',
  templateUrl: './email-client.component.html',
  styleUrls: ['./email-client.component.scss']
})
export class EmailClientComponent implements OnInit {
  emailForm: FormGroup;
  private _emailResultString = '';
  private _isEmailSuccessBool: boolean;
  constructor(
    public coreService: CoreService,
    private _emailClientService: EmailClientService
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      fromTxt: new FormControl(null, [Validators.required, Validators.email]),
      sbjTxt: new FormControl(null, [Validators.required]),
      msgTxt: new FormControl(null, [Validators.required])
    });
  }

  getEmailPlaceholder() {
    return this.coreService.getLang() === 'eng' ? 'Enter your email' : 'Inserisci la tua email';
  }

  getSubjectLabel() {
    return this.coreService.getLang() === 'eng' ? 'Subject' : 'Oggetto';
  }

  getSubjectPlaceholder() {
    return this.coreService.getLang() === 'eng' ? 'Title' : 'Titolo';
  }

  getMessageLabel() {
    return this.coreService.getLang() === 'eng' ? 'Message' : 'Messaggio';
  }

  getButtonText() {
    return this.coreService.getLang() === 'eng' ? 'Send' : 'Invia';
  }

  getEmailResultString() {
    return this._emailResultString;
  }

  isEmailSuccess() {
    return this._isEmailSuccessBool;
  }

  // sends request for the email and notifies of the outcome
  onSubmit() {
    if (this.emailForm.valid) {
      this._emailClientService.sendEmail(
        this.emailForm.get('fromTxt').value,
        this.emailForm.get('sbjTxt').value,
        this.emailForm.get('msgTxt').value
      )
      .subscribe(
        result => {
          this._isEmailSuccessBool = <boolean>result['isSuccess'];
          this._emailResultString = this.coreService.getLang() === 'eng' ? result['eng'] : result['ita'];
        },
        err => {
          this._emailResultString = 'Communication error';
          this._isEmailSuccessBool = false;
        }
      );
      this.emailForm.reset();
    } else {
      this._emailResultString = this.coreService.getLang() === 'eng' ?
        'Please enter valid Information' : 'Inserisci informazioni pertinenti nei campi!';
      this._isEmailSuccessBool = false;
    }
  }

}
