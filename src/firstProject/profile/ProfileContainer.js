import React from 'react';
import Profile from './Profile';
import {getUserProfileTC, getUserStatusTC, updateUserStatusTC, saveNewUserPhotoTC} from '../Redux/reducerProfile'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId && this.props.isAuth) {
            userId=this.props.authUserId        
            if(!userId) {
                this.props.history.push('/login')
            }
        }         
        this.props.getUserStatus(userId);
        this.props.getUserProfile(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    };

    componentDidUpdate(prevProp) {
        if(this.props.match.params.userId !== prevProp.match.params.userId) {
            this.refreshProfile()
        }     
    }

    render() {
        return (
            <div>
                <Profile {...this.props} 
                         status={this.props.status} 
                         profile={this.props.profile}
                         updateUserStatus={this.props.updateUserStatus}
                         isOwner={!this.props.match.params.userId}
                         aveNewUserPhoto={this.props.saveNewUserPhoto}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        authUserId: state.auth.userId,
        isAuth: state.auth.isAuth        
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (userId) => {dispatch(getUserProfileTC(userId))},
        getUserStatus: (userId) => {dispatch(getUserStatusTC(userId))},
        updateUserStatus: (status) => {dispatch(updateUserStatusTC(status))},
        saveNewUserPhoto: (file) => {dispatch(saveNewUserPhotoTC(file))}
    }
}

export default compose(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(ProfileContainer)
