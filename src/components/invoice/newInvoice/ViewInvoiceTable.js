import React, { Component } from 'react';

import axios from 'axios';

const backendde= require('../../../backendde');

class ViewInvoiceTable extends Component {
    constructor(props) {
        super(props);
        this.onDeleteItem=this.onDeleteItem.bind(this);
        this.state={
            products:'',
            batchDetails:'',
            tot:0
        };
        this.props.callbackSum(this.props.batch.batchDetails.retailPrice * this.props.obj.quantity);
        const printCartRow={
            productName:this.props.batch.productName,
            retailPrice:this.props.batch.batchDetails.retailPrice.toFixed(2),
            quantity:this.props.obj.quantity,
        };
        this.props.callbackPrintRow(printCartRow);

        
    };
    onDeleteItem(){
        this.props.callbackSum((-1)*this.props.batch.batchDetails.retailPrice * this.props.obj.quantity);
        axios.delete(backendde.backendUrl+'addINVC/deleteINVCitem/' + this.props.obj._id)

            .then((res) => {
                console.log('Product successfully deleted!');
                // console.log(res.data)
                this.props.deleteItem(res.data); // return new cart
                
            }).catch((error) => {
                console.log(error)
            });
        
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.batch.productName}
                </td>
                <td>
                   {this.props.batch.batchDetails.batchNo}
                </td>
                <td>
                    {new Date(this.props.batch.batchDetails.expDate).toLocaleDateString()}
                </td>
                <td align="right">
                    {this.props.batch.batchDetails.retailPrice.toFixed(2)}
                </td>
                <td align="right">
                    {this.props.obj.quantity}
                </td>
                <td align="right"><b>Rs. 
                    {(this.props.batch.batchDetails.retailPrice * this.props.obj.quantity).toFixed(2)}
                    </b>
                </td>
                <td>
                    <button onClick={this.onDeleteItem} className="btn btn-danger">delete</button>
                </td>
                
            </tr>
        );
    }
}

export default ViewInvoiceTable;