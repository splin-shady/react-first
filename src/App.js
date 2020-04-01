import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderContainer from './firstProject/header/HeaderContainer';
import Nav from './firstProject/nav/Nav';
import DialogsContainer from './firstProject/dialogs/DialogsContainer';
import ProfileContainer from './firstProject/profile/ProfileContainer';
import UsersContainer from './firstProject/users/usersContainer';
import Login from './firstProject/login/Login';
import { initializeAppTC } from './firstProject/Redux/reducerApp';
import Preloader from './firstProject/commenComponents/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) return <Preloader />;
    return (
      <div className="App">
        <HeaderContainer />
        <Nav />
        <div className="Mes">
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const mapDispatchToProps = (dispatch) => ({
  initializeApp: () => dispatch(initializeAppTC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
