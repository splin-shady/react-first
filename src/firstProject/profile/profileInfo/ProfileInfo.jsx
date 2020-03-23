import React, {useState} from 'react';
import Preloader from '../../commenComponents/Preloader';
import ProfileStatusHook from './ProfileStatusHook';
import userPhoto from '../../../assets/images.png'
import ProfileAbout from './ProfileAbout'
import ProfileAboutForm from './ProfileAboutForm'

const ProfileInfo = ({saveProfile, profile, saveNewUserPhoto, isOwner, status, updateUserStatus}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) return <Preloader />

    const onUserPhotoSelect = (event) =>{
        if(event.target.files.length){
            saveNewUserPhoto(event.target.files[0])
        }
    }

    const onSubmit = (formData) =>{
        saveProfile(formData).then(
            ()=> {setEditMode(false)}
        )
        
    }
    
    return (
        <div>
            <img src={profile.photos.large || userPhoto} alt="userPhoto"/>
            {isOwner && <input type={'file'} onChange={onUserPhotoSelect}></input>}
            <ProfileStatusHook status={status} updateUserStatus={updateUserStatus}/>
            {editMode 
                ? <ProfileAboutForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
                : <ProfileAbout profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
        </div>
    )
}

export default ProfileInfo;