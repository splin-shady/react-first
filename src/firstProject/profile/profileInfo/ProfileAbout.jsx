import React from 'react';
import style from './profileInfo.module.css'

const ProfileAbout = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
            <div>
                <b>Full mane:</b> {profile.fullName}
            </div>

            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>

            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }

            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>

            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={ key } title={ key } value={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}

const Contact = ({ title, value }) => {
    return (
        <div className={style.contact}>
            <b>{title}:</b>{value}
        </div>
    )
}

export default ProfileAbout;
