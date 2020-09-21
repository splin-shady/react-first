import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Messages from './messages/Messages';
import { reguired, maxLengthCreator } from '../validators/validators';
import { Textarea } from '../commenComponents/formControl/FormControl';

const Dialogs = (props) => {

  const [selectPage, setSelectPage] = useState(null);
  
  useEffect(() => {
    props.getAllDialogs();
  },[props.state.dialogItemData])

  const addNewMessage = (value) => {
    props.sendMessage(2, value.newTextMessage);
  };

  return (
    <div className={style.dialogs}>
      <div className={style.dialogItem}>
        {props.state.dialogItemData.map((item) => 
          <div className={selectPage === item.id ? style.selectPage : style.notSelectPage} key={item.id}>
            <DialogItem id={item.id} name={item.userName} getMessages={props.getMessages} setSelectPage={setSelectPage} />
          </div>
        )}
      </div>
      <div className={style.messages}>
        {props.state.dialogMessages.map((item) => <Messages key={item.id} id={item.id} messages={item.mess} />)}

        <AddMessageFormRedux onSubmit={addNewMessage} />

      </div>
    </div>
  );
};

const maxLength20 = maxLengthCreator(20);
const AddMessageForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field component={Textarea} validate={[reguired, maxLength20]} name="newTextMessage" placeholder="new message" />
    <button>send</button>
  </form>
);

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
