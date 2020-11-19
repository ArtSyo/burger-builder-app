import React from "react";

import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component {
  state = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
    },
    loading: false,
  };

  confirmOrderBtnHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };
    console.log(order);
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          elementType='...'
          elementConfig='...'
          value='...'
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="address"
          placeholder="Your Address"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.confirmOrderBtnHandler}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>ENTER YOUR CONTACT DATA:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
