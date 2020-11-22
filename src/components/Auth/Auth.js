import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.css';
import { connect } from 'react-redux';

import { auth } from '../../store/actions/index';

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
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidation(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  checkValidation = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementArray.map((formElement) => {
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
    return (
      <div className="Auth">
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

export default connect(null, { auth })(Auth);
