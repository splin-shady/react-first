import { stopSubmit } from 'redux-form';
import { userApi, profileApi } from '../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'GET_STATUS';
const SET_NEW_USER_PHOTO = 'SET_NEW_USER_PHOTO';

const initialState = {
  post: [
    { id: '1', postMess: 'xaxxaxa' },
    { id: '2', postMess: 'забыл совсем про эти посты)))' },
    { id: '3', postMess: 'хааххаах' },
    { id: '4', postMess: 'сори))' },
  ],
  profile: null,
  status: '',
};

const headerReduser = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_POST:
      newState = {
        ...state,
        post: [...state.post, { id: [...state.post].length + 1, postMess: action.value }],
      };
      newState.newTextPost = '';
      return newState;

    case DELETE_POST:
      newState = {
        ...state,
      };
      newState.post.splice(action.postId - 1, 1);
      return newState;

    case SET_USER_PROFILE:
      newState = {
        ...state,
        profile: action.profile,
      };
      return newState;

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SET_NEW_USER_PHOTO:
      return {
        ...state,

        profile: { ...state.profile, photos: action.photo },
      };

    default: return state;
  }
};

export const deletePostActionCreator = (postId) => ({ type: DELETE_POST, postId });
export const addPostCreator = (value) => ({ type: ADD_POST, value });
export const setUserProfileAC = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatusAC = (status) => ({ type: SET_STATUS, status });
export const saveNewUserPhotoAC = (photo) => ({ type: SET_NEW_USER_PHOTO, photo });

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await userApi.getProfile(userId);
  dispatch(setUserProfileAC(response.data));
};
export const getUserStatus = (userId) => (dispatch) => {
  profileApi.getStatus(userId).then((response) => {
    dispatch(setUserStatusAC(response.data));
  });
};

export const updateUserStatus = (status) => (dispatch) => {
  profileApi.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserStatusAC(status));
    }
  });
};

export const saveNewUserPhoto = (file) => (dispatch) => {
  profileApi.saveNewPhoto(file).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(saveNewUserPhotoAC(response.data.data.photos));
    }
  });
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const response = await profileApi.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(getState().auth.userId));
  } else {
    dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default headerReduser;
