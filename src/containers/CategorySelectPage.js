import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategorySelect from '../components/CategorySelect/CategorySelect';

class CategorySelectPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsAndImagesData: this.props.productsAndImagesData
        };
    }

    componentWillReceiveProps(newProps) {

        console.log("newProps", newProps.productsAndImagesData);

        this.setState({
            productsAndImagesData: newProps.productsAndImagesData
        });
    }

    render() {

        return (
            <div className="pt-3 px-3">
                <CategorySelect productsAndImagesData={this.state.productsAndImagesData} />
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