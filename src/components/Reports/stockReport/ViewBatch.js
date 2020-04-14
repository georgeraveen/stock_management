import React, { Component } from 'react';

class ViewBatch extends Component {
    constructor(props){
        super(props);
        this.createDate= new Date(this.props.obj1.expDate);
    }
    
    render() {
        return (
            <tr>
                <td>--->  {this.props.key1+1}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()}</td>
                <td>{this.props.obj1.wholePrice}</td>
                <td>{this.props.obj1.retailPrice}</td>
                <td>{this.props.obj1.currentStock}</td>
                <td align="right">Rs. {this.props.obj1.wholePrice*this.props.obj1.currentStock}</td>
            </tr>
        );
    }
}

export default ViewBatch;