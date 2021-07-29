import store from 'store'
import * as actions from './actions'

const STORED_SETTINGS = (storedSettings: object) => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}

export const initialState: object = {
  // default settings, if not exist in localStorage
  ...STORED_SETTINGS({
    authProvider: 'firebase', // firebase, jwt
    logo: 'Biz1Book',
    locale: 'en-US',
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    menuLayoutType: 'left', // left, top, nomenu
    routerAnimation: 'slideFadeinUp', // none, slideFadeinUp, slideFadeinRight, Fadein, zoomFadein
    menuColor: 'white', // white, dark, gray
    theme: 'default', // default, dark
    authPagesColor: 'white', // white, gray, image
    primaryColor: '#4b7cf3',
    leftMenuWidth: 256,
    isMenuUnfixed: false,
    isMenuShadow: false,
    isTopbarFixed: false,
    isGrayTopbar: false,
    isContentMaxWidth: false,
    isAppMaxWidth: false,
    isGrayBackground: false,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
  }),
}

export function reducer(state = initialState, action: actions.Actions): object {
  switch (action.type) {
    case actions.SET_STATE:
      const key = Object.keys(action.payload)[0]
      store.set(`app.settings.${key}`, action.payload[key])
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const getSettings = (state: any) => state
