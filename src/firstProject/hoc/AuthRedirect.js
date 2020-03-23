import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render() {
            if (!this.props.auth.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }

    let RedirectComponentWithConnect = connect(mapStateToProps)(RedirectComponent)

    return RedirectComponentWithConnect
}