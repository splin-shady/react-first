import { stopSubmit } from 'redux-form';
import { authApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
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

export const getAuthUserDataTC = () => (dispatch) => authApi.authMe()
  .then((response) => {
    if (response.data.resultCode === 0) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
    }
  });

export const loginTC = (email, password, rememberMe) => (dispatch) => {
  authApi.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserDataTC());
    } else {
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

export default authReduser;
