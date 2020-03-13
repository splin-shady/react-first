import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutTC } from '../Redux/reducerAuth';

class HeaderContainer extends React.Component {    

    render() {
        return <Header {...this.props}/>
    }
}
let mapStateToProps = (state) => ({
    isAuth : state.auth.isAuth,
    login: state.auth.login,
})

let mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutTC())
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer); 