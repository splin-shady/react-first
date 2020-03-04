import React from 'react';
import Profile from './Profile';
import {getUserProfileTC, getUserStatusTC, updateUserStatusTC} from '../Redux/reducerProfile'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { withAuthRedirect} from '../hoc/AuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId=2;
        this.props.getUserStatus(userId);
        this.props.getUserProfile(userId);
    };

    render() {
        return (
            <div>
                <Profile {...this.props} 
                         status={this.props.status} 
                         profile={this.props.profile}
                         updateUserStatus={this.props.updateUserStatus}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status
        
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (userId) => {dispatch(getUserProfileTC(userId))},
        getUserStatus: (userId) => {dispatch(getUserStatusTC(userId))},
        updateUserStatus: (status) => {dispatch(updateUserStatusTC(status))}
    }
}

export default compose(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(ProfileContainer)
