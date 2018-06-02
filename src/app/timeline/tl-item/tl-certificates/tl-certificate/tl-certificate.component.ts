import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from '../../../../shared/models/certificate.model';

@Component({
  selector: 'app-tl-certificate',
  templateUrl: './tl-certificate.component.html',
  styleUrls: ['./tl-certificate.component.scss']
})
export class TlCertificateComponent implements OnInit {
  @Input() certificate: Certificate;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
