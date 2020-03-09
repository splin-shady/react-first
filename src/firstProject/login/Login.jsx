import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Input} from '../commenComponents/formControl/FormControl'
import {reguired, maxLengthCreator} from '../validators/validators'

const maxLength30 = maxLengthCreator(30)

const LoginForm = (props) => {    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[reguired, maxLength30]} component={Input} name={'login'} placeholder={'login'}/>
            </div>
            <div>
                <Field validate={[reguired, maxLength30]} component={Input} name={'password'} placeholder={'password'}/>
            </div>
            <div>
                <Field validate={[reguired, maxLength30]} component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) =>{
        console.log(formData)
    }
    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}


export default Login