import { getAuthUserDataTC } from './reducerAuth';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type initialStateType = {
  initialized: boolean,
};

const initialState: initialStateType = {
  initialized: false,
};

const appReduser = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default: return state;
  }
};

type initializedSuccessACType = {
  type: typeof INITIALIZED_SUCCESS 
}

export const initializedSuccessAC = ():initializedSuccessACType => ({ type: INITIALIZED_SUCCESS });

export const initializeAppTC = () => (dispatch: any) => {
  dispatch(getAuthUserDataTC()).then(() => {
    dispatch(initializedSuccessAC());
  });
};

export default appReduser;
