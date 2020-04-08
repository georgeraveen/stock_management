import React, { Component } from 'react';

class ProductListDropdown extends Component {
    render() {
        return (
            <option value={this.props.obj._id}>{this.props.obj.productName}</option>
        );
    }
}

export default ProductListDropdown;