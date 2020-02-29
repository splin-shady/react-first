import React from 'react';
import style from './styleProfile.module.css';
import Post from './post';

const Posts = (props) => {
  let postElement = props.state.post.map(item => <Post id={item.id} mess={item.postMess} deletePostContainer={props.deletePostContainer}/>); 

  let addPost = () => {
    props.addPostContainer();
  }

  let onPostChange = (event) =>{
    let text = event.target.value;
    props.updateTextPostContainer(text);
  }

  return (
    <div className={style.profile}>
      <h3>Posts</h3>
      <textarea placeholder="text" onChange={onPostChange} value = {props.state.newTextPost}/>
      <button onClick={addPost}>add post</button>
      <div className={style.posts}>
        {postElement} 
      </div>
    </div>    
  );
}

export default Posts;