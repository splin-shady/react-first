import {userApi} from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS ='SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

let initialState = {
    users : [],
    newTextPost : '',
    pageSize: 5,
    portionSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: []
  }

const usersReduser = (state = initialState, action) => {
    switch(action.type){  
        case FOLLOW: 
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId){
                        return {...user, followed: true};
                    } else return user;
                })

            }
        case UNFOLLOW: 
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId){
                        return {...user, followed: false};
                    } else return user;
                })
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
             
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state, 
                totalUsersCount: action.totalCount
            }
        
        case TOGGLE_IS_FETCHING: 
            return {
                ...state, 
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRES: 
            return {
                ...state, 
                followingInProgres: action.isFollowing 
                ? [...state.followingInProgres, action.userId]
                : state.followingInProgres.filter(id => id !== action.userId)
            }

        default: return state;    
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsersAC = (users) => ({type: SET_USERS, users: users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCountAC = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount: totalCount});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const toggleIsFollowingAC = (isFollowing, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRES, isFollowing, userId});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {    
        dispatch(toggleIsFetchingAC(true));
        userApi.getUsers(currentPage, pageSize).then(data =>{ 
            dispatch(toggleIsFetchingAC(false));              
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        });
    }
}

export const followThunkCreator = (userId) => {
    return (dispatch) => {    
        dispatch(toggleIsFollowingAC(true, userId));                                      
        userApi.follow(userId).then(response =>{ 
            if (response.data.resultCode === 0) {dispatch(followAC(userId))}
            dispatch(toggleIsFollowingAC(false, userId));   
        });
    }
}

export const unfollowThunkCreator = (userId) => {
    return (dispatch) => {    
        dispatch(toggleIsFollowingAC(true, userId));    
        userApi.unfollow(userId).then(response =>{
            if (response.data.resultCode === 0) {dispatch(unfollowAC(userId))}
            dispatch(toggleIsFollowingAC(false, userId));  
        });
    }
}


export default usersReduser;