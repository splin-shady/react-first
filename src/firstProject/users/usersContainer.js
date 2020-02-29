import React from 'react';
import { connect } from 'react-redux';
import {unfollowThunkCreator, setCurrentPageAC, toggleIsFollowingAC,
        getUsersThunkCreator, followThunkCreator} from '../Redux/reducerUsers';
import Users from './Users';
import Preloader from '../commenComponents/Preloader';

class UsersContainer extends React.Component {

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        /*this.props.toggleIsFetching(true);
        userApi.getUsers(this.props.currentPage, this.props.pageSize).then(data =>{ 
                this.props.toggleIsFetching(false);               
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    };
    

    onPageChange = (currentPage) =>{ 
        
        
        this.props.setCurrentPage(currentPage);
        /*this.props.toggleIsFetching(true);

        userApi.getUsers(currentPage, this.props.pageSize).then(data =>{
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);                
            });*/
        this.props.getUsers(currentPage, this.props.pageSize);
    }
    
    render() {
        return <> 
            {this.props.isFetching ? <Preloader /> : null}
            <Users  totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChange={this.onPageChange}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    users={this.props.users}
                    followingInProgres={this.props.followingInProgres}/>
                </>      
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgres: state.usersPage.followingInProgres
    };
}

let mapDispatchToProps = (dispatch) => {
    return {     
        setCurrentPage: (currentPage) => {dispatch(setCurrentPageAC(currentPage))},
        toggleIsFollowing: (isFollowing, usreId) => {dispatch(toggleIsFollowingAC(isFollowing, usreId))},
        getUsers: (currentPage, pageSize) => {dispatch(getUsersThunkCreator(currentPage, pageSize))},
        follow: (userId) => {dispatch(followThunkCreator(userId))},
        unfollow: (userId) => {dispatch(unfollowThunkCreator(userId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
