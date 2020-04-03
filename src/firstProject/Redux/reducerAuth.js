import { stopSubmit } from 'redux-form';
import { authApi, securityApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReduser = (state = initialState, action) => {
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

export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setAuthUserDataAC = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: {
    userId, email, login, isAuth,
  },
});

export const getCaptchaUrlAC = (captchaUrl) => ({ type: GET_CAPTCHA_URL, captchaUrl });

export const getAuthUserDataTC = () => (dispatch) => authApi.authMe()
  .then((response) => {
    if (response.data.resultCode === 0) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
    }
  });

export const loginTC = (email, password, rememberMe, captcha) => (dispatch) => {
  authApi.login(email, password, rememberMe, captcha).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserDataTC());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC())
      }
      const messageError = response.data.messages[0];
      dispatch(stopSubmit('login', { _error: messageError }));
    }
  });
};

export const logoutTC = () => (dispatch) => {
  authApi.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, false));
    }
  });
};

export const getCaptchaUrlTC = () => (dispatch) => {
  securityApi.getCaptchaUrl().then((response) => {
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlAC(captchaUrl));
  });
};

export default authReduser;
