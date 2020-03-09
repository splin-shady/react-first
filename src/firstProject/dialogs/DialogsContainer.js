import Dialogs from './Dialogs';
import {addMessageCreator} from '../Redux/reducerDialogs';
import {connect} from 'react-redux';
import { withAuthRedirect} from '../hoc/AuthRedirect';
import { compose } from 'redux';


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
        sendMessage: (newTextMessage) => dispatch(addMessageCreator(newTextMessage))
    }
};

const DialogsConainer = compose(
    withAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
  )(Dialogs)

export default DialogsConainer; 
