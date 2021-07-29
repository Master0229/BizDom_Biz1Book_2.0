import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-advanced-form-examples',
  templateUrl: './form-examples.component.html',
  styles: [
    `
      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `,
  ],
})
export class AdvancedFormExamplesComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  marks = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
  }
  validateForm1: FormGroup
  validateForm2: FormGroup
  submitForm1(): void {
    for (const i in this.validateForm1.controls) {
      if (this.validateForm1.controls.hasOwnProperty(i)) {
        this.validateForm1.controls[i].markAsDirty()
        this.validateForm1.controls[i].updateValueAndValidity()
      }
    }
  }
  submitForm2(): void {
    for (const i in this.validateForm2.controls) {
      if (this.validateForm2.controls.hasOwnProperty(i)) {
        this.validateForm2.controls[i].markAsDirty()
        this.validateForm2.controls[i].updateValueAndValidity()
      }
    }
  }
  ngOnInit(): void {
    this.validateForm1 = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      budget: [30],
    })
    this.validateForm2 = this.fb.group({
      amount: [null, [Validators.required]],
      pin: [null, [Validators.required]],
    })
  }
}
