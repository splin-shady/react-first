import React from 'react';
import Preloader from '../../commenComponents/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from '../../../assets/images.png'

const ProfileInfo = (props) => {
    if (!props.profile) return <Preloader />

    const onUserPhotoSelect = (event) =>{
        if(event.target.files.length){
            props.saveNewUserPhoto(event.target.files[0])
        }
    }
    
    return (
        <div>
            <img src={props.profile.photos.large || userPhoto} alt="userPhoto"/>
            {props.isOwner && <input type={'file'} onChange={onUserPhotoSelect}></input>}
            <ProfileStatusHook status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
    )
}

export default ProfileInfo;