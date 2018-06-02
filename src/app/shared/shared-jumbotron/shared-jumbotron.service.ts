import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CoreService } from '../services/core.service';

@Injectable()
export class SharedJumbotronService {
  private _modalTemplateRef: TemplateRef<any>;
  private _modalRef: BsModalRef;
  private _senderId = '';
  private _modalTitle = '';
  private _addressLink = '';
  private _config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private _modalService: BsModalService,
    private _coreService: CoreService,
  ) {}

  setModalTemplateRef(modalTemplateRef: TemplateRef<any>) {
    this._modalTemplateRef = modalTemplateRef;
  }

  getModalTemplateRef() {
    return this._modalTemplateRef;
  }

  getModalRef() {
    return this._modalRef;
  }

  getSenderId() {
    return this._senderId;
  }

  getModalTitle() {
    return this._modalTitle;
  }

  getAddressLink() {
    return this._addressLink;
  }

  // case switch to determine what to show in the modal. Set modal options
  openModal(senderId: string, config?: any) {
    this._senderId = senderId;
    if (config) { this._config = config; }
    switch (this._senderId) {
      case 'DenisImgLink':
        this._loadJumboPicInfo();
        break;
      case 'address_savi':
        this._setAddressInfo(this._senderId);
        break;
      case 'address_milan':
        this._setAddressInfo(this._senderId);
        break;
      case 'emailClient':
        this._loadEmailClientInfo();
        break;
      default:
        this._modalTitle = '';
        break;
    }
    this._modalRef = this._modalService.show(
      this._modalTemplateRef,
      Object.assign({}, this._config, { class: 'gray modal-lg' })
    );
  }

  private _loadJumboPicInfo() {
    this._modalTitle = this._coreService.getLang() === 'eng' ? 'Profile Image' : 'Immagine Profilo';
  }

  // set google maps iframe address and modal title
  private _setAddressInfo(senderId: string) {
    if (senderId === 'address_milan') {
      this._modalTitle = 'Via Francesco Olgiati, 25. 20143 Milano, MI';
      this._addressLink = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9416.395467343!2d9.139351167439203!3d45.' +
        '43935544121356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c3b8d75fe4c5%3A0xd6f47cf8a5ae146a!2sVia+' +
        'Francesco+Olgiati%2C+25%2C+20143+Milano+MI!5e0!3m2!1sen!2sit!4v1506549715924';
    } else {
      this._modalTitle = 'Via Galimberti, 35. 12038 Savigliano, CN';
      this._addressLink = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.761721836488!2d7.663660615878487!' +
        '3d44.642786779099765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cd5111d6869189%3A0x541c08506aa1e60e!' +
        '2sVia+Duccio+Galimberti%2C+35%2C+12038+Savigliano+CN!5e0!3m2!1sen!2sit!4v1505922624307';
    }
  }

  private _loadEmailClientInfo() {
    this._modalTitle = this._coreService.getLang() === 'eng' ? 'Email Client' : 'Email';
  }

}
