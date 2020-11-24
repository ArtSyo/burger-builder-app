import React, { useEffect, useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidation } from '../../shared/utility';
import { auth, setAuthRedirectPath } from '../../store/actions/index';

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  const { building, authRedirectPath, setAuthRedirectPath } = props;

  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      setAuthRedirectPath('/');
    }
  }, [building, authRedirectPath, setAuthRedirectPath]);

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.auth(controls.email.value, controls.password.value, isSignup);
  };

  const inputChangeHandler = (e, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: e.target.value,
        valid: checkValidation(
          e.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  let formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementArray.map((formElement) => {
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(e) => inputChangeHandler(e, formElement.id)}
      />
    );
  });

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className="Auth">
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

export default connect(
  (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.tokenId !== null,
    building: state.ingredients.building,
    authRedirectPath: state.auth.authRedirectPath,
  }),
  { auth, setAuthRedirectPath }
)(Auth);
