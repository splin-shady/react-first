import { connect } from 'react-redux';
import { compose } from 'redux';
import Dialogs from './Dialogs';
import { getAllDialogs, getMessages, sendMessage } from '../Redux/reducerDialogs';
import { withAuthRedirect } from '../hoc/AuthRedirect';

const mapStateToProps = (state) => ({
  state: state.dialogs,
});
const mapDispatchToProps = (dispatch) => ({
  getAllDialogs: () => dispatch(getAllDialogs()),
  getMessages: (userId) => dispatch(getMessages(userId)),
  sendMessage: (userId, message) => dispatch(sendMessage(userId, message)),
});

const DialogsConainer = compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps),
)(Dialogs);

export default DialogsConainer;
