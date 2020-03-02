import Dialogs from './Dialogs';
import {updateTextMessageCreator, addMessageCreator} from '../Redux/reducerDialogs';
import {connect} from 'react-redux';
import { withAuthRedirect} from '../hoc/AuthRedirect';


/*const DialogsConaine = (props) => {

  const onNewMessagePostClick = () => {
    props.dispatch(addMessageCreator())
  }
  
  const onTextMessageChange = (newTextMess) => {
    props.dispatch(updateTextMessageCreator(newTextMess));
  }

    return <Dialogs onNewMessagePostClickContainer={onNewMessagePostClick} 
                    onTextMessageChangeContainer={onTextMessageChange}
                    state={props.state}/>;
  }*/
  
let mapStateToProps = (state) => {
    return {
        state: state.dialogs
    }
};
let mapDispatchToProps = (dispatch) => {
    return{
        onNewMessagePostClickContainer: () => dispatch(addMessageCreator()),
        onTextMessageChangeContainer: (newTextMess) => dispatch(updateTextMessageCreator(newTextMess))
    }
};
const AuthRedirect = withAuthRedirect(Dialogs)
const DialogsConainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirect);

export default DialogsConainer; 