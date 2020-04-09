import { userApi } from '../api/api';
import { usersType } from '../types/types';
import { type } from 'os';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

const initialState = {
  users: [] as Array<usersType>,
  newTextPost: '',
  pageSize: 5,
  portionSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgres: [] as Array<number>,
};

type initialStateType = typeof initialState

const usersReduser = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          } return user;
        }),

      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          } return user;
        }),
      };
    case SET_USERS:
      return { ...state, users: [...action.users] };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_IS_FOLLOWING_PROGRES:
      return {
        ...state,
        followingInProgres: action.isFollowing
          ? [...state.followingInProgres, action.userId]
          : state.followingInProgres.filter((id) => id !== action.userId),
      };

    default: return state;
  }
};

type followType = {
  type: typeof FOLLOW
  userId: number
}
export const followAC = (userId: number): followType => ({ type: FOLLOW, userId });

type unfollowType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowAC = (userId : number): unfollowType => ({ type: UNFOLLOW, userId });

type setUsersType = {
  type: typeof SET_USERS
  users: Array<usersType>
}
export const setUsersAC = (users: Array<usersType>): setUsersType => ({ type: SET_USERS, users });

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPageAC = (currentPage : number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalCount: number
}
export const setTotalUsersCountAC = (totalCount : number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalCount });

type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type toggleIsFollowingType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRES
  isFollowing: boolean
  userId : number
}
export const toggleIsFollowingAC = (isFollowing: boolean, userId : number): toggleIsFollowingType => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFollowing, userId });

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => (dispatch: any) => {
  dispatch(toggleIsFetchingAC(true));
  userApi.getUsers(currentPage, pageSize).then((data: any) => {
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
  });
};

export const followThunkCreator = (userId: number) => (dispatch: any) => {
  dispatch(toggleIsFollowingAC(true, userId));
  userApi.follow(userId).then((response: any) => {
    if (response.data.resultCode === 0) { dispatch(followAC(userId)); }
    dispatch(toggleIsFollowingAC(false, userId));
  });
};

export const unfollowThunkCreator = (userId: number) => (dispatch: any) => {
  dispatch(toggleIsFollowingAC(true, userId));
  userApi.unfollow(userId).then((response: any) => {
    if (response.data.resultCode === 0) { dispatch(unfollowAC(userId)); }
    dispatch(toggleIsFollowingAC(false, userId));
  });
};

export default usersReduser;
