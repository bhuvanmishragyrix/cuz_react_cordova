import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

import './PaymentDetailsFormReactStripe.css?raw';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
    }

    submit(ev) {
        this.props.stripe.createToken({ name: "Name" })
            .then((data) => {
                console.log(data);
                this.props.sendTokenToServerAndCompletePayment(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={(ev) => { this.submit(ev) }}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);