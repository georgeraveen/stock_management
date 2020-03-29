import React, { Component } from 'react';

import axios from 'axios';

const backendde= require('./../../../backendde');

class ViewGRNTable extends Component {
    constructor(props) {
        super(props);
        this.onDeleteItem=this.onDeleteItem.bind(this);
        this.state={
            products:'',
            batchDetails:''
        };
    };
    
    componentDidMount(){
        axios.get(backendde.backendUrl+'viewProduct/viewID/'+this.props.obj.productID)
            .then(response =>{
                this.setState({
                    products:response.data,
                    batchDetails:response.data.batches.find(e => e._id === this.props.obj.batchID)
                });
            })
        .catch(function (error){
            console.log('hix');
            console.log(error);
        });
    }
    onDeleteItem(){
        axios.delete(backendde.backendUrl+'addGRN/deleteGRNitem/' + this.props.obj._id)

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
                <td>
                    {this.state.batchDetails.wholePrice}
                </td>
                <td>
                    {this.state.batchDetails.retailPrice}
                </td>
                <td>
                    {this.props.obj.quantity}
                </td>
                <td>
                    <button onClick={this.onDeleteItem} className="btn btn-danger">delete</button>
                </td>
            </tr>
        );
    }
}

export default ViewGRNTable;