import { connect } from 'react-redux';
import Posts from './posts';
import { addPostCreator, deletePostActionCreator } from '../../Redux/reducerProfile';

/* const ProfileContainer = (props) => {

  let addPost = () => {
    props.dispatch(addPostCreator());
  }

  let onPostChange = (text) =>{
    props.dispatch(updateTextPostCreator(text));
  }

  return (<Profile addPostContainer={addPost} onPostChangeContainer={onPostChange} state={props.state}/>);
} */

const mapStateToProps = (state) => ({
  state: state.profile,
});
const mapDispatchToProps = (dispatch) => ({
  addPostContainer: (value) => dispatch(addPostCreator(value)),
  deletePostContainer: (postId) => dispatch(deletePostActionCreator(postId)),
});

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
