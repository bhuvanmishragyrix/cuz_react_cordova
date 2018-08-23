import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategorySelect from '../components/CategorySelect/CategorySelect';

class CategorySelectPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        console.log("New Props", newProps);
    }

    render() {

        return (
            <div className="pt-3 px-3">
                <CategorySelect productsAndImagesData={this.props.productsAndImagesData} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productsAndImagesData: state.images
    };
};

export default connect(mapStateToProps)(CategorySelectPage);