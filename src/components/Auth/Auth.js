import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidation } from '../../shared/utility';
import { auth, setAuthRedirectPath } from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath('/');
    }
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  inputChangeHandler = (e, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        valid: checkValidation(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };


  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
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
          changed={(e) => this.inputChangeHandler(e, formElement.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="Auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

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
