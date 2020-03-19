import React, { Component } from 'react';

class ProductListDropdown extends Component {
    render() {
        return (
            <option>{this.props.obj.productName}</option>
        );
    }
}

export default ProductListDropdown;