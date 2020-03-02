import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className={style.head}>
        <h1>ffffffffffffffffdddddfffffff</h1>
        <div className={style.loginBlock}>
          {props.isAuth ? props.login: <NavLink to='/login'>login</NavLink>}
        </div>
    </header>
  );
}

export default Header; 