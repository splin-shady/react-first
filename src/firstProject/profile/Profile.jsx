import React from 'react';
import ProfileInfo from './profileInfo/ProfileInfo';
import PostsContainer from './posts/postsContainer';




const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <PostsContainer />
        </div>
    )
}

export default Profile;