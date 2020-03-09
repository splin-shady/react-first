import React from 'react';
import style from './styleProfile.module.css';
import Post from './post';
import {Field, reduxForm} from 'redux-form'

const Posts = (props) => {
  let postElement = props.state.post.map(item => <Post id={item.id} mess={item.postMess} deletePostContainer={props.deletePostContainer}/>); 

  let addPost = (value) => {
    props.addPostContainer(value.postBody);
  }

  return (
    <div className={style.profile}>
      <h3>Posts</h3>

      <AddPostFormRedux onSubmit={addPost}/>

      <div className={style.posts}>
        {postElement} 
      </div>
    </div>    
  );
}

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component='textarea' name='postBody' placeholder='post text here'/>
      <button>add post</button>
    </form>
  )
}

const AddPostFormRedux = reduxForm({form: 'addPostForm'})(AddPostForm)

export default Posts;