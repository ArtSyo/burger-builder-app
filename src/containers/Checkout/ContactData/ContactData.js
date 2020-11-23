import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { updateObject, checkValidation } from '../../../shared/utility';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { buyBurger } from '../../../store/actions/index';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        value: 'fastest',
        valid: true,
      },
    },
    formIsValid: false,
  };

  confirmOrderBtnHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElIdentifier in this.state.orderForm) {
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.buyBurger(order, this.props.token);
    console.log(order);
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: e.target.value,
        valid: checkValidation(
          e.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.confirmOrderBtnHandler}>
        {formElementArray.map((formElement) => {
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
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h3>ENTER YOUR CONTACT DATA:</h3>
        {form}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ingredients: state.ingredients.ingredients,
    totalPrice: state.ingredients.totalPrice,
    loading: state.order.loading,
    token: state.auth.tokenId,
    userId: state.auth.userId,
  }),
  { buyBurger }
)(withErrorHandler(ContactData, axios));
