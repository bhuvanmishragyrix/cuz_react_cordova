import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {

    render () {

axios.get('https://app.fakejson.com/q/MGjXOCbg?token=NF_kNGG2t8bzD9EiETLQsQ')
.then((res) => {console.log("response",res);}).catch((err) => {console.log(err)});

        return (
            <div>
                <h1>The Users</h1>
                <p>Awesome users on board of this course!</p>
            </div>
        );
    }
}

export default Users;