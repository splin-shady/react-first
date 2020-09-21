import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css';

function Header(props) {
  return (
    <header className={style.head}>
      <h1>soсiale network</h1>
      <div className={style.loginBlock}>
        {props.isAuth
          ? (
            <div>
              {' '}
              {props.login}
              {' '}
              <button onClick={props.logout}>Log out</button>
            </div>
          )
          : <NavLink to="/login">login</NavLink>}
      </div>
    </header>
  );
}

export default Header;
