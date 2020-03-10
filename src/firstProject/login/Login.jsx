import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Input} from '../commenComponents/formControl/FormControl'
import {reguired, maxLengthCreator} from '../validators/validators'
import { connect } from 'react-redux'
import { loginTC } from '../Redux/reducerAuth'
import { Redirect } from 'react-router-dom';

const maxLength30 = maxLengthCreator(30)

const LoginForm = (props) => {    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[reguired, maxLength30]} component={Input} name={'email'} placeholder={'login'}/>
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
        console.log(formData);
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginTC})(Login)