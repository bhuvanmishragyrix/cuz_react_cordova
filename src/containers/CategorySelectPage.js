import React, { Component } from 'react';

import CategorySelect from '../components/CategorySelect/CategorySelect';

class CategorySelectPage extends Component {

    render() {
        return (
            <div className="pt-3 px-3">
                <CategorySelect />
            </div>
        );
    }
};

export default CategorySelectPage;