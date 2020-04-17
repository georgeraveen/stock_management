import React, { Component } from 'react';

class SalesList extends Component {
    
    render() {
        
        return (
            <tr>
                <td>
                    {this.props.products.productName}
                </td>
                <td>
                    {this.props.batch.batchNo}
                </td>
                <td  align="right">
                    {this.props.sum}
                </td>
                <td  align="right">
                    {this.props.batch.retailPrice.toFixed(2)}
                </td>
                <td  align="right">
                    Rs. {(this.props.batch.retailPrice*this.props.sum).toFixed(2)}
                </td>
            </tr>
        );
    }
}

export default SalesList;