import React from 'react';
import styles from './Login.css';

const login = () => {
    return (
        <div className={`mx-3 mb-2`}>
            <p className={`${styles.loginHeader} text-center`}>Login</p>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input className={`form-control`} />
            <div className={`text-center mt-4`}>
                <button className={`btn btn-primary form-control`}>Login</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.newToCuzText} m-0 p-0`}>New to CUZ?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
            <button className={`btn btn-primary form-control mt-2`}>Sign up</button>
        </div>
    );
};

export default login;