import { stopSubmit } from 'redux-form';
import { userApi, profileApi } from '../api/api';
import { postType, profileType, photosType } from '../types/types';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'GET_STATUS';
const SET_NEW_USER_PHOTO = 'SET_NEW_USER_PHOTO';

const initialState = {
  post: [
    { id: 1, postMess: 'xaxxaxa' },
    { id: 2, postMess: 'забыл совсем про эти посты)))' },
    { id: 3, postMess: 'хааххаах' },
    { id: 4, postMess: 'сори))' },
  ] as Array<postType>,
  profile: null as profileType | null,
  status: '',
  newTextPost: '',
};

export type initialStateType = typeof initialState

const headerReduser = (state = initialState, action: any): initialStateType => {
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

        profile: { ...state.profile, photos: action.photo } as profileType,
      };

    default: return state;
  }
};

type deletePostType = { 
  type: typeof DELETE_POST 
  postId: number
}
export const deletePostActionCreator = (postId: number): deletePostType => ({ type: DELETE_POST, postId });

type addPostType = { 
  type: typeof ADD_POST 
  value: string
}
export const addPostCreator = (value: string): addPostType => ({ type: ADD_POST, value });

type setUserProfileType = { 
  type: typeof SET_USER_PROFILE 
  profile: profileType
}
export const setUserProfileAC = (profile: profileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile });

type setUserStatusType = { 
  type: typeof SET_STATUS 
  status: string
}
export const setUserStatusAC = (status: string): setUserStatusType => ({ type: SET_STATUS, status });

type saveNewUserPhotoType = { 
  type: typeof SET_NEW_USER_PHOTO 
  photo: photosType
}
export const saveNewUserPhotoAC = (photo: photosType): saveNewUserPhotoType => ({ type: SET_NEW_USER_PHOTO, photo });

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await userApi.getProfile(userId);
  dispatch(setUserProfileAC(response.data));
};
export const getUserStatus = (userId: number) => (dispatch: any) => {
  profileApi.getStatus(userId).then((response: any) => {
    dispatch(setUserStatusAC(response.data));
  });
};

export const updateUserStatus = (status: string) => (dispatch: any) => {
  profileApi.updateStatus(status).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserStatusAC(status));
    }
  });
};

export const saveNewUserPhoto = (file: any) => (dispatch: any) => {
  profileApi.saveNewPhoto(file).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(saveNewUserPhotoAC(response.data.data.photos));
    }
  });
};

export const saveProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
  const response = await profileApi.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(getState().auth.userId));
  } else {
    dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default headerReduser;
