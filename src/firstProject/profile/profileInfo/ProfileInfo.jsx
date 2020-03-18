import React from 'react';
import Preloader from '../../commenComponents/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from '../../../assets/images.png'

const ProfileInfo = (props) => {
    if (!props.profile) return <Preloader />
    return (
        <div>
            <img src={props.profile.photos.large || userPhoto} alt="userPhoto"/>
            <ProfileStatusHook status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
    )
}

export default ProfileInfo;