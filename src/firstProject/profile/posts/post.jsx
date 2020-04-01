import React from 'react';
import style from './stylePost.module.css';
import userPhoto from '../../../assets/images.png'

const Post = (props) => {

    let deletePost = (event) => {
        let postId = event.target.id;
        props.deletePostContainer(postId);
    }

    return (
        <div className={style.post}>
            <img src={userPhoto} alt='userPhoto'></img>
            <div className={style.text}>
                {props.mess}
            </div>
            <button onClick={deletePost} id={props.id}>delete</button>
        </div>

    )
}

export default Post;
