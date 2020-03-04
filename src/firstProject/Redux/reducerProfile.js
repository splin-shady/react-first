import { userApi, profileApi } from '../api/api';

const ADD_POST = 'ADD_POST';
const UPDATE_TEXT_POST = 'UPDATE_TEXT_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE ='SET_USER_PROFILE';
const SET_STATUS = 'GET_STATUS';

let initialState = {
    post : [
      {id : '1', postMess : 'xaxxaxa'},
      {id : '2', postMess : 'забыл совсем про эти посты)))'},
      {id : '3', postMess : 'хааххаах'},
      {id : '4', postMess : 'сори))'}
    ],
    newTextPost : '',
    profile : null,
    status: ''
  }

const headerReduser = (state = initialState,action) => {
    let newState; 
    switch(action.type){        
        case ADD_POST:
            let newPostMess = state.newTextPost;
            newState = {
                ...state,
                newTextPost : '',
                post : [...state.post, {id : [...state.post].length + 1, postMess : newPostMess}]
            };
            newState.newTextPost = '';
            return newState;

        case UPDATE_TEXT_POST:
            newState = {
                ...state,
                newTextPost : action.newText
            };
            return newState;

        case DELETE_POST :
            newState = {
                ...state,               
            };
            newState.post.splice(action.postId-1, 1);
            return newState;
        
        case SET_USER_PROFILE:
            newState = {
                ...state, 
                profile: action.profile              
            };
            return newState;

        case SET_STATUS:
            return {
                ...state,
                status: action.status 
            }

        default: return state;    
    }
}

export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId: postId});
export const addPostCreator = () => ({type: ADD_POST});
export const updateTextPostCreator = (text) => ({type: UPDATE_TEXT_POST, newText:text});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatusAC = (status) => ({type: SET_STATUS, status});


export const getUserProfileTC = (userId) => (dispatch) =>{
    userApi.getProfile(userId).then(response =>{ 
        dispatch(setUserProfileAC(response.data));        
    }); 
}
export const getUserStatusTC = (userId) => (dispatch) =>{
    profileApi.getStatus(userId).then(response =>{ 
        dispatch(setUserStatusAC(response.data));
    }); 
}

export const updateUserStatusTC = (status) => (dispatch) =>{
    profileApi.updateStatus(status).then(response =>{ 
        if (response.data.resultCode === 0){
            dispatch(setUserStatusAC(status));
        }
    }); 
}

export default headerReduser;