import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
  console.log(props)
  return (
    <header className={style.head}>
        <h1>soсiale network</h1>
        <div className={style.loginBlock}>
          {props.isAuth 
            ? <div> {props.login}  <button onClick={props.logout}>Log out</button></div>
            : <NavLink to='/login'>login</NavLink>}
        </div>
    </header>
  );
}

export default Header; 