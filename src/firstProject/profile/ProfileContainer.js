import React from 'react';
import Profile from './Profile';
import {getUserProfileTC} from '../Redux/reducerProfile'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId=2;
        this.props.getUserProfile(userId)
    };

    render() {
        if (!this.props.auth.isAuth) return <Redirect to={'/login'}/>
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        auth: state.auth
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (userId) => {dispatch(getUserProfileTC(userId))}
    }
}

const ProfileContainerRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainerRouter);