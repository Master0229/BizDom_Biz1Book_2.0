import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'

@Component({
  selector: 'cui-system-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style.component.scss'],
})
export class RegisterComponent {
  form: FormGroup
  loading: boolean = false

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.form = fb.group({
      email: [, [Validators.required, Validators.minLength(4)]],
      password: [, [Validators.required]],
      name: [, [Validators.required]],
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }
  get name() {
    return this.form.controls.name
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    this.name.markAsDirty()
    this.name.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid || this.name.invalid) {
      return
    }
    const payload = {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
    }
    this.store.dispatch(new UserActions.Register(payload))
  }
}
