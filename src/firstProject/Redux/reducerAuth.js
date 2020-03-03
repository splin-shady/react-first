import { authApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
  }

const authReduser = (state = initialState, action) => {
    switch(action.type){  
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data,
                isAuth: true
                }
            

        case TOGGLE_IS_FETCHING: 
            return {
                ...state, 
                isFetching: action.isFetching
            }

        default: return state;    
    }
}

export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const setAuthUserDataAC = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}});

export const setAuthUserDataTC = () => (dispatch) =>{
        authApi.authMe().then(response =>{ 
            if(response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserDataAC(id, email, login))
            }
        });    
}


export default authReduser;