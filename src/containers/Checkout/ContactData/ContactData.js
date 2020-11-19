import React from "react";

import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
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
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className="Input"
          type="text"
          name="address"
          placeholder="Your Address"
        />
        <input
          className="Input"
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
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
