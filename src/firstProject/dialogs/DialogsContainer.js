import { connect } from 'react-redux';
import { compose } from 'redux';
import Dialogs from './Dialogs';
import { addMessageCreator } from '../Redux/reducerDialogs';
import { withAuthRedirect } from '../hoc/AuthRedirect';

const mapStateToProps = (state) => ({
  state: state.dialogs,
});
const mapDispatchToProps = (dispatch) => ({
  sendMessage: (newTextMessage) => dispatch(addMessageCreator(newTextMessage)),
});

const DialogsConainer = compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps),
)(Dialogs);

export default DialogsConainer;
