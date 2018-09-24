import React from 'react';
import styles from './SignUp.css';
import { withRouter } from 'react-router-dom';

const signUp = (props) => {

    let navigateToLogin = () => {
        props.history.replace('/login');
    };

    return (
        <div className={`mx-3 mb-2`}>
            <p className={`${styles.signUpHeader} text-center`}>SignUp</p>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input className={`form-control`} />
            <div className={`text-center mt-4`}>
                <button className={`btn btn-primary form-control`}>SignUp</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.alreadyAMemberText} m-0 p-0`}>Already a member?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
            <button onClick={navigateToLogin} className={`btn btn-light form-control mt-4 ${styles.login}`}>Login</button>
        </div>
    );
};

export default withRouter(signUp);