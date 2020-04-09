import React from 'react'
import ProfileInfo from './profileInfo/ProfileInfo'
import PostsContainer from './posts/postsContainer'

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo 
                saveNewUserPhoto={props.saveNewUserPhoto} 
                isOwner={props.isOwner} profile={props.profile} 
                status={props.status} 
                updateUserStatus={props.updateUserStatus}
                saveProfile={props.saveProfile}/>            
            <PostsContainer />
        </div>
    )
}

export default Profile
