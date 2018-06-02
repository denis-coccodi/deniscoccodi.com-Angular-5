import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CvDataHandlerService } from '../services/cv-data-handler.service';
import { ImageSet } from './image-set.model';

@Injectable()
export class CvImagesService {
  private _modalTemplateRef: TemplateRef<any>;
  private _modalRef: BsModalRef;
  private _currentImageSet: ImageSet;
  private _config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    public cvDataHandler: CvDataHandlerService,
    private modalService: BsModalService
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

  getCurrentImageSet() {
    return this._currentImageSet;
  }

  // set modal options and set the ids (categoryId and occurrenceId) of the occurrence that called the modal
  openModal(senderId: string) {
    this._setCurrentElementIds(senderId);
    this._modalRef = this.modalService.show(
      this._modalTemplateRef,
      Object.assign({}, this._config, { class: 'gray modal-lg' })
    );
  }

  // extract occurrence Ids from the caller button Id
  private _setCurrentElementIds(senderId: string) {
    const splitId = senderId.split('_');
    this._currentImageSet = this.cvDataHandler.searchImageSet(splitId[1], splitId[2]);
  }

}
