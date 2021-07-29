import { Action } from '@ngrx/store'

export const LOGIN = '[Auth] Login'
export const LOGIN_SUCCESSFUL = '[Auth] Login Succesful'
export const LOGIN_UNSUCCESSFUL = '[Auth] Login Unsuccesful'
export const REGISTER = '[Auth] Register'
export const REGISTER_SUCCESSFUL = '[Auth] Register Succesful'
export const REGISTER_UNSUCCESSFUL = '[Auth] Register Unsuccesful'
export const LOAD_CURRENT_ACCOUNT = '[Auth] Load Current Account'
export const LOAD_CURRENT_ACCOUNT_SUCCESSFUL = '[Auth] Load Current Account Succesful'
export const LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL = '[Auth] Load Current Account Unsuccesful'
export const LOGOUT = '[Auth] Logout'
export const FLUSH_USER = '[User] Flush User'
export const EMPTY_ACTION = '[User] Empty Action'

export class Login implements Action {
  readonly type = LOGIN
  constructor(public payload: any) {}
}

export class LoginSuccessful implements Action {
  readonly type = LOGIN_SUCCESSFUL
  constructor(public payload: any) {}
}

export class LoginUnsuccessful implements Action {
  readonly type = LOGIN_UNSUCCESSFUL
  constructor() {}
}

export class Register implements Action {
  readonly type = REGISTER
  constructor(public payload: any) {}
}

export class RegisterSuccessful implements Action {
  readonly type = REGISTER_SUCCESSFUL
  constructor(public payload: any) {}
}

export class RegisterUnsuccessful implements Action {
  readonly type = REGISTER_UNSUCCESSFUL
  constructor() {}
}

export class LoadCurrentAccount implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT
  constructor() {}
}

export class LoadCurrentAccountSuccessful implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT_SUCCESSFUL
  constructor(public payload: any) {}
}

export class LoadCurrentAccountUnsuccessful implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL
  constructor() {}
}

export class Logout implements Action {
  readonly type = LOGOUT
  constructor() {}
}

export class FlushUser implements Action {
  readonly type = FLUSH_USER
  constructor() {}
}

export class EmptyAction implements Action {
  readonly type = EMPTY_ACTION
  constructor() {}
}

export type Actions =
  | Login
  | LoginSuccessful
  | LoginUnsuccessful
  | Register
  | RegisterSuccessful
  | RegisterUnsuccessful
  | LoadCurrentAccount
  | LoadCurrentAccountSuccessful
  | LoadCurrentAccountUnsuccessful
  | Logout
  | FlushUser
  | EmptyAction
