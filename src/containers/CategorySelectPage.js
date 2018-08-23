import React from 'react';

import CategorySelect from '../components/CategorySelect/CategorySelect';

const CategorySelectPage = () => {

    console.log("Category select page ran.");

    return (
        <div className="pt-3 px-3">
            <CategorySelect />
        </div>
    );
};

export default CategorySelectPage;