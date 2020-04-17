import React, { Component } from 'react';

class ViewBatch extends Component {
    
    render() {
        return (
            <tr>
                <td>--->  {this.props.key1+1}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{new Date(this.props.obj1.expDate).toLocaleDateString()}</td>
                <td>Rs. {this.props.obj1.wholePrice.toFixed(2)}</td>
                <td>Rs. {this.props.obj1.retailPrice.toFixed(2)}</td>
                <td >{this.props.obj1.currentStock}</td>
                
            </tr>
        );
    }
}

export default ViewBatch;