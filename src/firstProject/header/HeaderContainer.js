import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserDataTC, logoutTC } from '../Redux/reducerAuth';

class HeaderContainer extends React.Component {

    componentDidMount(){
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}
let mapStateToProps = (state) => ({
    isAuth : state.auth.isAuth,
    login: state.auth.login,
})

let mapDispatchToProps = (dispatch) => ({
    getAuthUserData : () => dispatch(setAuthUserDataTC()),
    logout: () => dispatch(logoutTC())
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer); 