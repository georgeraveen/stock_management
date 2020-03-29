import React, { Component } from 'react';

import axios from 'axios';

const backendde= require('./../../../backendde');

class ViewGRNTable extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            products:[],
            batches:[],
        };
    }
    componentDidMount(){
        axios.get(backendde.backendUrl+'viewProduct/viewID/'+this.props.obj.productID)
            .then(response =>{
                this.setState({products:response.data});
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });

        axios.get(backendde.backendUrl+'Batch/viewID/'+this.props.obj.productID+'/'+this.props.obj.batchID)
            .then(response =>{
                this.setState({batches:response.data});
                console.log(response);
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    render() {
        return (
            <tr>
                <td>
                    {this.state.products.productName}
                </td>
                <td>
                    {this.state.batches.batchNo}
                </td>
                <td>
                    {this.props.obj.batchID}
                </td>
                <td>
                    {this.props.obj.batchID}
                </td>
                <td>
                    {this.props.obj.batchID}
                </td>
                <td>
                    {this.props.obj.quantity}
                </td>
                <td>
                    <button className="btn btn-danger">delete</button>
                </td>
            </tr>
        );
    }
}

export default ViewGRNTable;