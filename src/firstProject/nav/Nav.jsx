import React from 'react';
import style from './navStyle.module.css';
import {NavLink} from 'react-router-dom';

const Nav = () => {
	return (
		<nav className={style.nav}>
			<ul>
				<li><NavLink to='/profile'>PROFILE</NavLink></li>
				<li><NavLink to='/dialogs'>MESSAGES</NavLink></li>
				<li><NavLink to='/users'>USERS</NavLink></li>
				<li><NavLink to='/profile'>MUSIC</NavLink></li>
				<li><NavLink to='/profile'>SETTINGS</NavLink></li>
			</ul>
		</nav>
	)
}

export default Nav; 