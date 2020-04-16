import React from 'react';

const DialogItem = (props) => {

  const getSelectMessages = () => {
    props.getMessages(props.id);
    props.setSelectPage(props.id)
  }

  return (
    <span onClick={getSelectMessages}>{props.name}</span>
  );
};

export default DialogItem;
