import React from 'react';
import styles from './Login.css';

const login = () => {
    return (
        <div className={`mx-3`}>
            <p className={`${styles.loginHeader} text-center`}>Login</p>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input className={`form-control`} />
            <div className={`text-center mt-2`}>
                <button className={`btn`}>Login</button>
            </div>
        </div>
    );
};

export default login;