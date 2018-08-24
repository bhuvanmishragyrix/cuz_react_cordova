import axios from 'axios';
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { black } from 'material-ui/styles/colors';

export const getFromAPI = (url) => {
    const promiseForGetFromAPI = new Promise((resolve, reject) => {
        axios.get(url)
            .then((res) => { resolve(res) })
            .catch((err) => { reject(err); });

    });

    return promiseForGetFromAPI;
};

export const circularProgress = (size) => {
    return <CircularProgress style={{ color: black }} size={50} />
};