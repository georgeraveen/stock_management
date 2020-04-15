import React, { Component } from 'react';

class ViewBatch extends Component {
    constructor(props) {
        super(props);
        
        this.editBatchd=this.editBatchd.bind(this);
    }
    editBatchd(){
        this.props.editbatch(this.props.obj1._id);
    }
    render() {
        return (
            <tr>
                <td>--->  {this.props.key1+1}</td>
                <td>{this.props.obj1.batchNo}</td>
                <td>{new Date(this.props.obj1.expDate).toLocaleDateString()}</td>
                <td>{this.props.obj1.wholePrice}</td>
                <td>{this.props.obj1.retailPrice}</td>
                <td><button onClick={this.editBatchd} className="btn btn-warning">edit</button></td>
                <td ></td>
                
            </tr>
        );
    }
}

export default ViewBatch;