import React, { Component } from 'react';

class GRNRecordTableRow extends Component {
    constructor(props){
        super(props);
        this.state={
            batchDetail:this.props.products.batches.find(e => e._id===this.props.records.batchID)
        }
        this.createDate= new Date(this.state.batchDetail.expDate);
        this.onlyDateCreate=this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()
        this.props.callbackSum(this.state.batchDetail.wholePrice*this.props.records.quantity);
        
    }
   
    render() {
        return (
            <tr>
                <td>{this.props.products.productName}</td>
                <td>{this.state.batchDetail.batchNo}</td>
                <td>{new Date(this.state.batchDetail.expDate).toLocaleDateString()}</td>
                <td  align="right">Rs. {this.state.batchDetail.wholePrice}</td>
                <td  align="right">{this.props.records.FreeQuantity}</td>
                <td  align="right">{this.props.records.quantity}</td>
                <td align="right">{this.state.batchDetail.wholePrice*this.props.records.quantity}</td>
                
            </tr>
        );
    }
}

export default GRNRecordTableRow;