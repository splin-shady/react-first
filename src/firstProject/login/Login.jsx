import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Input } from '../commenComponents/formControl/FormControl';
import { reguired, maxLengthCreator } from '../validators/validators';
import { loginTC } from '../Redux/reducerAuth';
import style from './styleLogin.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field validate={[reguired, maxLength30]} component={Input} name="email" placeholder="login" />
    </div>
    <div>
      <Field validate={[reguired, maxLength30]} component={Input} name="password" placeholder="password" type="password" />
    </div>
    <div>
      <Field validate={[reguired, maxLength30]} component={Input} name="rememberMe" type="checkbox" />
      {' '}
      remember me
    </div>

    {props.captchaUrl && <img src={props.captchaUrl} />}
    {props.captchaUrl
              && <Field component={Input} name="captcha" placeholder="text from image" />}

    {props.error && <div className={style.stopSubmitError}>{props.error}</div>}
    <div>
      <button>login</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { loginTC })(Login);
