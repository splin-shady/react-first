import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.auth.isAuth) return <Redirect to="/login" />;
      return <Component {...this.props} />;
    }
  }

  const RedirectComponentWithConnect = connect(mapStateToProps)(RedirectComponent);

  return RedirectComponentWithConnect;
};
