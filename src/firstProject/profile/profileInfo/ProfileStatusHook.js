import React, { useState, useEffect } from 'react';

const ProfileStatusHook = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (event) => {
    setStatus(event.currentTarget.value);
  };

  return (
    <>
      {!editMode
        ? (
          <div>
            <span onDoubleClick={activateEditMode}>{props.status || '--------------'}</span>
          </div>
        )
        : (
          <div>
            <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} value={status} />
          </div>
        )}
    </>
  );
};

export default ProfileStatusHook;
