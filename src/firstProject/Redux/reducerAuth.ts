import { authApi, securityApi } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type initialStateType = typeof initialState

const authReduser = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case GET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };

    default: return state;
  }
};

type toggleIsFetchingACType = {
  type: typeof TOGGLE_IS_FETCHING, 
  isFetching: boolean 
}

export const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingACType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type setAuthUserDataACType = {
  type: typeof SET_USER_DATA,
  data: {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
  },
}

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):setAuthUserDataACType => ({
  type: SET_USER_DATA,
  data: {
    userId, email, login, isAuth,
  },
});

type getCaptchaUrlAC = {
  type: typeof GET_CAPTCHA_URL
  captchaUrl: string
}

export const getCaptchaUrlAC = (captchaUrl: string): getCaptchaUrlAC => ({ type: GET_CAPTCHA_URL, captchaUrl });

export const getAuthUserDataTC = () => (dispatch: any) => authApi.authMe()
  .then((response: any) => {
    if (response.data.resultCode === 0) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
    }
  });

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => (dispatch: any) => {
  authApi.login(email, password, rememberMe, captcha).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserDataTC());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC());
      }
      const messageError = response.data.messages[0];
      dispatch(stopSubmit('login', { _error: messageError }));
    }
  });
};

export const logoutTC = () => (dispatch: any) => {
  authApi.logout().then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false));
    }
  });
};

export const getCaptchaUrlTC = () => (dispatch: any) => {
  securityApi.getCaptchaUrl().then((response: any) => {
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlAC(captchaUrl));
  });
};

export default authReduser;
