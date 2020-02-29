import React from 'react';
import style from './stylePost.module.css';

const Post = (props) => {

    let deletePost = (event) => {
        let postId = event.target.id;
        props.deletePostContainer(postId);
    }

    return (
        <div className={style.post}>
            <img src='https://sun9-47.userapi.com/c855528/v855528829/1594a5/EUvwwvvU60E.jpg'></img>
            <div className={style.text}>
                {props.mess}
            </div>
            <button onClick={deletePost} id={props.id}>delete</button>
        </div>

    )
}

export default Post;