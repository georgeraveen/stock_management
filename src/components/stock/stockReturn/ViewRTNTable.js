import React, { Component } from 'react';

import axios from 'axios';

const backendde= require('./../../../backendde');

class ViewRTNTable extends Component {
    constructor(props) {
        super(props);
        this.onDeleteItem=this.onDeleteItem.bind(this);
        
        this.state={
            products:'',
            batchDetails:'',
            tot:0
        };
        
        
    };
    componentDidMount(){
        axios.get(backendde.backendUrl+'viewProduct/viewID/'+this.props.obj.productID)
            .then(response =>{
                this.setState({
                    products:response.data,
                    batchDetails:response.data.batches.find(e => e._id === this.props.obj.batchID)
                });
                this.props.callbackSum(this.state.batchDetails.wholePrice * this.props.obj.quantity);
            })
        .catch(function (error){
            console.log('hix');
            console.log(error);
        });
    }
    onDeleteItem(){
        axios.delete(backendde.backendUrl+'addRTN/deleteRTNitem/' + this.props.obj._id)

            .then((res) => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            });
    }
    render() {
        return (
            <tr>
                <td>
                    {this.state.products.productName}
                </td>
                <td>
                   {this.state.batchDetails.batchNo}
                </td>
                <td>
                    {this.state.batchDetails.expDate}
                </td>
                <td align="right">
                    {this.state.batchDetails.wholePrice}
                </td>
                <td align="right">
                    {this.state.batchDetails.retailPrice}
                </td>
                <td align="right">
                    {this.props.obj.quantity}
                </td>
                <td align="right"><b>Rs. 
                    {this.state.batchDetails.wholePrice * this.props.obj.quantity}
                    </b>
                </td>
                <td>
                    <button onClick={this.onDeleteItem} className="btn btn-danger">delete</button>
                </td>
                
            </tr>
        );
    }
}

export default ViewRTNTable;