import * as UserActions from './actions'

export const initialState: object = {
  id: '',
  name: '',
  role: '',
  email: '',
  avatar: '',
  authorized: false,
  loading: false,
}

export function reducer(state = initialState, action: UserActions.Actions): object {
  switch (action.type) {
    case UserActions.LOGIN:
    case UserActions.REGISTER:
    case UserActions.LOAD_CURRENT_ACCOUNT:
      return {
        ...state,
        loading: true,
      }
    case UserActions.LOGIN_SUCCESSFUL:
    case UserActions.REGISTER_SUCCESSFUL:
    case UserActions.LOAD_CURRENT_ACCOUNT_SUCCESSFUL:
      return {
        ...state,
        ...action.payload,
        loading: false,
        authorized: true,
      }
    case UserActions.LOGIN_UNSUCCESSFUL:
    case UserActions.REGISTER_UNSUCCESSFUL:
    case UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
        authorized: false,
      }
    case UserActions.FLUSH_USER:
      return {
        id: '',
        name: '',
        role: '',
        email: '',
        avatar: '',
        authorized: false,
        loading: false,
      }
    case UserActions.EMPTY_ACTION:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export const getUser = (state: any) => state
