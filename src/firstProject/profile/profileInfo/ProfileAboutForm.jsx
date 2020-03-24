import React from 'react'
import style from './profileInfo.module.css'
import {Field, reduxForm} from 'redux-form'
import {Input, Textarea} from '../../commenComponents/formControl/FormControl'

const ProfileAboutForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>  
            {error && <div className={style.stopSubmitError}>{error}</div>}          
            <div>
                <b>Full mane:</b> <Field component={Input} name={'fullName'} placeholder={'full name'}/>
            </div>

            <div>
                <b>Looking for a job:</b> <Field component={Input} name={'lookingForAJob'} type='checkbox'/>
            </div>

            
            <div>
                <b>My professional skills:</b>
                <Field component={Textarea} name={'lookingForAJobDescription'} placeholder={'Your professional skills'}/>
            </div>

            <div>
                <b>About me:</b>
                <Field component={Textarea} name={'aboutMe'} placeholder={'About me'}/>
            </div>

            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key =>{
                    return <div key={key} className={style.contact}>
                        <b>{key}: <Field component={Input} name={'contacts.'+key} placeholder={key}/></b>
                    </div>
                })}
            </div>
            <button>save</button>
        </form>
    )
}


const ProfileAboutReduxForm = reduxForm({form:'editProfile'})(ProfileAboutForm)

export default ProfileAboutReduxForm;