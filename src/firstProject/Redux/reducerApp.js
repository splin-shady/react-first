import { getAuthUserDataTC } from './reducerAuth';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

const appReduser = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default: return state;
  }
};

export const initializedSuccessAC = () => ({ type: INITIALIZED_SUCCESS });

export const initializeAppTC = () => (dispatch) => {
  dispatch(getAuthUserDataTC()).then(() => {
    dispatch(initializedSuccessAC());
  });
};

export default appReduser;
