import React from 'react';
import style from './dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Messages from './messages/Messages';
import { Redirect } from 'react-router-dom';


const Dialogs = (props) => {

  const onNewMessagePostClick = () => {
    props.onNewMessagePostClickContainer();
  }
  
  const onTextMessageChange = (event) => {
    let newTextMess = event.target.value;
    props.onTextMessageChangeContainer(newTextMess);
  }

  if (!props.auth.isAuth) return <Redirect to={'/login'}/>

    return (
      <div className={style.dialogs}>
        <div className={style.dialogItem}>
          {props.state.dialogItemData.map(item => <DialogItem id={item.id} name={item.name}/>)}
        </div>
        <div className={style.messages}>
          {props.state.dialogMessages.map(item => <Messages id={item.id} messages={item.mess}/>)}
          
          <textarea placeholder="text" value={props.state.newTextMessage} onChange={onTextMessageChange}></textarea>
          <button onClick={onNewMessagePostClick}>send</button>

        </div>
      </div>
    );
  }
  
  export default Dialogs; 