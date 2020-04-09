import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logoutTC } from '../Redux/reducerAuth';

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutTC()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
