import React from 'react';
import './App.css';
import HeaderContainer from './firstProject/header/HeaderContainer';
import Nav from './firstProject/nav/Nav';
import DialogsContainer from './firstProject/dialogs/DialogsContainer'
import ProfileContainer from './firstProject/profile/ProfileContainer'
import UsersContainer from './firstProject/users/usersContainer'
import { Route } from 'react-router-dom';

function App(props) {
  return (
      <div className="App">
        <HeaderContainer />
        <Nav />
        <div className="Mes">
          <Route path='/dialogs' render={ () => <DialogsContainer />}/>
          <Route path='/profile/:userId?' render={ () => <ProfileContainer />}/>
          <Route path='/users' render={ () => <UsersContainer />}/>
        </div>
      </div>
  );
}

export default App; 
