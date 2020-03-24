import Dialogs from './Dialogs';
import { addMessageCreator } from '../Redux/reducerDialogs';
import { connect } from 'react-redux';
import { withAuthRedirect} from '../hoc/AuthRedirect';
import { compose } from 'redux';
  
let mapStateToProps = (state) => {
    return {
        state: state.dialogs
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newTextMessage) => dispatch(addMessageCreator(newTextMessage))
    }
};

const DialogsConainer = compose(
    withAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
  )(Dialogs)

export default DialogsConainer; 
