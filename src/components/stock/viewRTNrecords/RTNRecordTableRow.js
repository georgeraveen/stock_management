import React, { Component } from 'react';

class RTNRecordTableRow extends Component {
    constructor(props){
        super(props);
        this.state={
            batchDetail:this.props.products.batches.find(e => e._id===this.props.records.batchID)
        }
        
        this.props.callbackSum(this.state.batchDetail.wholePrice*this.props.records.quantity);
        
    }
   
    render() {
        return (
            <tr>
                <td>{this.props.products.productName}</td>
                <td>{this.state.batchDetail.batchNo}</td>
                <td>{this.state.batchDetail.expDate}</td>
                <td  align="right">Rs. {this.state.batchDetail.wholePrice}</td>
                <td  align="right">{this.props.records.quantity}</td>
                <td align="right">{this.state.batchDetail.wholePrice*this.props.records.quantity}</td>
                
            </tr>
        );
    }
}

export default RTNRecordTableRow;