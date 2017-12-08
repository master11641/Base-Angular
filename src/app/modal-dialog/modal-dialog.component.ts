import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { ModalService } from "./../core/modal.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

@Component({
  selector: "app-modal-dialog",
  templateUrl: "./modal-dialog.component.html",
  styleUrls: ["./modal-dialog.component.css"]
})
export class ModalDialogComponent  {
  modalRef: BsModalRef;
  confirmResult: string;
  fileName:string;
  fileNames:Array<string>;
  constructor(
    private modalService: BsModalService,
    private customModalService: ModalService
  ) {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteRecord() {
    this.confirmResult = "";
    this.customModalService
      .show(
        ConfirmModalComponent,
        {
          title: "Confirm",
          message: "Do you want to delete this record?"
        },
        {
          animated: true,
          keyboard: true,
          backdrop: true,
          ignoreBackdropClick: false
        }
      )
      .then(confirmed => {
        if (confirmed) {
          this.confirmResult = "Deleted!";
        } else {
          this.confirmResult = "Canceled!";
        }
      });
  }


}
