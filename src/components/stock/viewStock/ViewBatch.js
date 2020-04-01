import React, { Component } from 'react';

class ViewBatch extends Component {
    
    render() {
        return (
            <tr>
                <td>--->  {this.props.key1+1}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{this.props.obj1.expDate}</td>
                <td>{this.props.obj1.wholePrice}</td>
                <td>{this.props.obj1.retailPrice}</td>
                <td >{this.props.obj1.currentStock}</td>
                
            </tr>
        );
    }
}

export default ViewBatch;