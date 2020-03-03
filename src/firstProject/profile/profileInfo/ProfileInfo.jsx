import React from 'react';
import Preloader from '../../commenComponents/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if(!props.profile) return <Preloader />
    return (
        <div>
            <img src={props.profile.photos.large} alt=""/>
            <ProfileStatus status='sssssss'/>
        </div>
    )
}

export default ProfileInfo;