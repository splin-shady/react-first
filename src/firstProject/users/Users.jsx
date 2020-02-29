import React from 'react';
import style from './usersStyle.module.css';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
import {userApi} from '../api/api';



const Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i<=pageCount; i++){
        pages.push(i);
    }

    
    return( 
            <div>
                <div>
                {pages.map(i => {
                    return <span className={props.currentPage === i ? style.selectPage: style.pageCount}
                                 onClick={() => props.onPageChange(i)}>{i}</span>
                })}
                </div>

                {props.users.map(user => <div key={user.id}>
                    <div>
                        <div className={style.avatar}>
                            <NavLink to={'/profile/'+ user.id}>
                                <img src={user.photos.small} alt="userPhoto"/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                            ? <button disabled ={props.followingInProgres.some(id => id == user.id)} onClick={ () => {  
                                        props.unfollow(user.id)
                                    }
                                }>Unfollow</button>

                            : <button disabled ={props.followingInProgres.some(id => id == user.id)} onClick={ () => { 
                                        props.follow(user.id)
                                    }  
                                }>Follow</button>}
                        </div>
                    </div>

                    <div>
                        <p>{user.name}</p>
                        <p>{user.status}</p>
                        <p>{'--------'}</p>
                    </div>
                </div>)}
        </div>
    )
}

export default Users;