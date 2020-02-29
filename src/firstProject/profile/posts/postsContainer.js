import Posts from './posts';
import {addPostCreator, updateTextPostCreator, deletePostActionCreator} from '../../Redux/reducerProfile';
import {connect} from 'react-redux';

/*const ProfileContainer = (props) => { 

  let addPost = () => {
    props.dispatch(addPostCreator());
  }

  let onPostChange = (text) =>{
    props.dispatch(updateTextPostCreator(text));
  }

  return (<Profile addPostContainer={addPost} onPostChangeContainer={onPostChange} state={props.state}/>);
}*/
  
let mapStateToProps = (state) => {
  return {
      state: state.profile
  }
};
let mapDispatchToProps = (dispatch) => {
  return{
    addPostContainer: () => dispatch(addPostCreator()),
    updateTextPostContainer: (textPost) => dispatch(updateTextPostCreator(textPost)),
    deletePostContainer: (postId) => dispatch(deletePostActionCreator(postId))
  }
};

const PostsContainer = connect(mapStateToProps,mapDispatchToProps)(Posts);


export default PostsContainer;