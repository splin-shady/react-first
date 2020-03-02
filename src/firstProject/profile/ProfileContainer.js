import React from 'react';
import Profile from './Profile';
import {getUserProfileTC} from '../Redux/reducerProfile'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { withAuthRedirect} from '../hoc/AuthRedirect';

class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId=2;
        this.props.getUserProfile(userId)
    };

    render() {
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
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (userId) => {dispatch(getUserProfileTC(userId))}
    }
}
const AuthRedirect = withAuthRedirect(ProfileContainer)
const ProfileContainerRouter = withRouter(AuthRedirect);

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainerRouter);