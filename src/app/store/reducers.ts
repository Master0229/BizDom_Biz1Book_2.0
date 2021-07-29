import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store'
import { environment } from 'src/environments/environment'
import * as fromRouter from '@ngrx/router-store'
import * as fromSettings from './settings/reducers'
import * as fromUser from './user/reducers'

export const reducers: ActionReducerMap<any> = {
  router: fromRouter.routerReducer,
  settings: fromSettings.reducer,
  user: fromUser.reducer,
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    const result = reducer(state, action)
    console.groupCollapsed(action.type)
    console.log('prev state', state)
    console.log('action', action)
    console.log('next state', result)
    console.groupEnd()
    return result
  }
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : []

export const getSettingsState = createFeatureSelector<any>('settings')
export const getSettings = createSelector(getSettingsState, fromSettings.getSettings)

export const getUserState = createFeatureSelector<any>('user')
export const getUser = createSelector(getUserState, fromUser.getUser)
