import axios from 'axios';

export const getFromAPI = (url) => {
    const promiseForGetFromAPI = new Promise((resolve, reject) => {
        axios.get(url)
            .then((res) => { resolve(res) })
            .catch((err) => { reject(err); });

    });

    return promiseForGetFromAPI;
};