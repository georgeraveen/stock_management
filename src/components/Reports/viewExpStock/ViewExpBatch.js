import React, { Component } from 'react';

class ViewExpBatch extends Component {
    
    render() {
        return (
            <tr>
                <td>{this.props.obj1.productName}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{new Date(this.props.obj1.expDate).toLocaleDateString()}</td>
                <td>{this.props.obj1.wholePrice}</td>
                <td>{this.props.obj1.retailPrice}</td>
                <td >{this.props.obj1.currentStock}</td>
                
            </tr>
        );
    }
}

export default ViewExpBatch;