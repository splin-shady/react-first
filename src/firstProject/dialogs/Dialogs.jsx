import React from 'react';
import style from './dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Messages from './messages/Messages';
import { Redirect } from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'


const Dialogs = (props) => {

  const addNewMessage = (value) => {
    props.sendMessage(value.newTextMessage);
  }


    return (
      <div className={style.dialogs}>
        <div className={style.dialogItem}>
          {props.state.dialogItemData.map(item => <DialogItem id={item.id} name={item.name}/>)}
        </div>
        <div className={style.messages}>
          {props.state.dialogMessages.map(item => <Messages id={item.id} messages={item.mess}/>)}
          
          <AddMessageFormRedux onSubmit={addNewMessage}/>

        </div>
      </div>
    );
  }

  const AddMessageForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <Field component='textarea' name='newTextMessage' placeholder="new message"/>
        <button >send</button>
      </form>
    )
  }
    
  const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)
  
  export default Dialogs; 