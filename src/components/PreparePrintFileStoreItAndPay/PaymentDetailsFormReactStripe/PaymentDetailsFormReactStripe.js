import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

import './PaymentDetailsFormReactStripe.css?raw';

import styles from './PaymentDetailsFormReactStripe.css'

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
    }

    submit = () => {
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
                <p className={`${styles.headerText}`}>Please enter Payment Details.</p>
                <CardElement />
                <label className={`${styles.labelText} mt-2`}>Amount</label>
                <input disabled value={`${this.props.price} USD`} className={`form-control`} />
                <label className={`${styles.labelText} mt-2`}>Email</label>
                <input disabled value={this.props.email} className={`form-control`} />
                <label className={`${styles.labelText} mt-2`}>Name</label>
                <input className={`form-control`} />
                <label className={`${styles.labelText} mt-2`}>City</label>
                <input className={`form-control`} />
                <label className={`${styles.labelText} mt-2`}>Country</label>
                <input className={`form-control`} />
                <label className={`${styles.labelText} mt-2`}>Phone</label>
                <input type={`number`} className={`form-control`} />
                <div className={`text-center my-2`}>
                    <button className={'btn btn-primary'} onClick={this.submit}>Pay</button>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);