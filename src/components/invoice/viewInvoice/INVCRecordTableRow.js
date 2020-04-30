import React, { Component } from 'react';

class INVCRecordTableRow extends Component {
    constructor(props){
        super(props);
        this.state={
            batchDetail:this.props.products.batches.find(e => e._id===this.props.records.batchID)
        }
        
        this.props.callbackSum(this.state.batchDetail.retailPrice*this.props.records.quantity);
        
    }
   
    render() {
        return (
            <tr>
                <td>{this.props.products.productName}</td>
                <td>{this.state.batchDetail.batchNo}</td>
                <td>{new Date(this.state.batchDetail.expDate).toLocaleDateString()}</td>
                <td  align="right">Rs. {this.state.batchDetail.retailPrice.toFixed(2)}</td>
                <td  align="right">{this.props.records.quantity}</td>
                <td align="right">Rs. {(this.state.batchDetail.retailPrice*this.props.records.quantity).toFixed(2)}</td>
                
            </tr>
        );
    }
}

export default INVCRecordTableRow;