import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  // Input
  value: string

  // Radio
  radioValue = 'A'



  inputValue: string
  options: string[] = []

  expense: any;
  errorMsg: string = '';
  term;
  p;
  transactions = [];
  // Hide and Show

  public show: boolean = false;

  public buttonName: any = 'Back';

  hide = true;

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : []
  }

  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
    this.GetExpense();
  }

  GetExpense() {
    this.Auth.getExpense().subscribe(data => {
      this.expense = data;
      console.log(this.expense);
      for (let i = 0; i < this.expense.transtype.length; i++) {
        var obj = this.expense.payment.filter(x => x.Id == this.expense.transtype[i].PaymentTypeId);
        // console.log(obj)
        this.expense.transtype[i].Payment = obj[0].Description;
      }
      this.transactions = this.expense.transtype;
      // console.log(this.expense)
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        // console.log(dangertoast(this.errorMsg));

      }

    });
  }
  DeleteExp(Id) {
    this.Auth.DeleteExpense(Id).subscribe(data => {
      window.location.reload();
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        // console.log(dangertoast(this.errorMsg));
      }
      else {
        this.errorMsg = response.msg;
        // console.log(toast(this.errorMsg));

      }
    })
  }

  //Hide and Show toggle

  toggle() {
    this.show = !this.show;


    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Back";
    else
      this.buttonName = "Back";
  }

}
