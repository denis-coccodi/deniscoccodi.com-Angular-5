import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from '../../../../shared/models/certificate.model';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @Input() certificate: Certificate;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
