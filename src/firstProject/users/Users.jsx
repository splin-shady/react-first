import React from 'react';
import style from './usersStyle.module.css';
import { NavLink } from 'react-router-dom';
import Paginator from './paginator/Paginator';
import userPhoto from '../../assets/images.png'



const Users = (props) => {

    
    return( 
            <div>
                <Paginator {...props}/>

                {props.users.map(user => <div key={user.id}>
                    <div>
                        <div className={style.avatar}>
                            <NavLink to={'/profile/'+ user.id}>
                                <img src={user.photos.small || userPhoto} alt="userPhoto"/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                            ? <button disabled ={props.followingInProgres.some(id => id === user.id)} onClick={ () => {  
                                        props.unfollow(user.id)
                                    }
                                }>Unfollow</button>

                            : <button disabled ={props.followingInProgres.some(id => id === user.id)} onClick={ () => { 
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