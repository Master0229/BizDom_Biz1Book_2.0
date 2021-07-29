import { Component, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'kit-bootstrap-modals-example',
  templateUrl: './modals.component.html',
})
export class KitBootstrapModalsExampleComponent implements OnInit {
  closeResult: string

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content)
  }

  openCustomClass(content) {
    this.modalService.open(content, { centered: true })
  }

  ngOnInit() {}
}
