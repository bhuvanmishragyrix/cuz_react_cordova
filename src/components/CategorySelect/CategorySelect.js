import React, { Component } from 'react';
import CategorySelectStyles from './CategorySelect.css';

class CategorySelect extends Component {
    render() {
        return (
            <div>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
            </div>
        );
    }
}

export default CategorySelect;