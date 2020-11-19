import React from 'react';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }
    render() {
        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className='Input' type="text" name="name" placeholder="Your Name"/>
                    <input className='Input' type="email" name="email" placeholder="Your Email"/>
                    <input className='Input' type="text" name="address" placeholder="Your Address"/>
                    <input className='Input' type="text" name="postal" placeholder="Your Postal Code"/>
                    <Button btnType="Success" clicked={this.props.confirmOrderBtn}>ORDER NOW</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;