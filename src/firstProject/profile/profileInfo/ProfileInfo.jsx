import React from 'react';
import Preloader from '../../commenComponents/Preloader';

const ProfileInfo = (props) => {
    if(!props.profile) return <Preloader />
    return (
        <div>
            <img src={props.profile.photos.large} alt=""/>
        </div>
    )
}

export default ProfileInfo;