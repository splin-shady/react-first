import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserDataTC } from '../Redux/reducerAuth';

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
    getAuthUserData : () => dispatch(setAuthUserDataTC())
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer); 