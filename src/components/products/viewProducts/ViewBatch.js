import React, { Component } from 'react';

class ViewBatch extends Component {
    constructor(props){
        super(props);
       

    }
    render() {
        return (
            <tr>
                <td>--->  {this.props.key1+1}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{this.props.obj1.expDate}</td>
                <td>{this.props.obj1.wholePrice}</td>
                <td>{this.props.obj1.retailPrice}</td>
                <td colSpan='2'></td>
                
            </tr>
        );
    }
}

export default ViewBatch;