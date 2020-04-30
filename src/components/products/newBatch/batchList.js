import React, { Component } from 'react';
import axios from 'axios';

const backendde= require('./../../../backendde');
class BatchList extends Component {
    constructor(props) {
        super(props);
        this.deleteBatch = this.deleteBatch.bind(this);
        
        console.log(this.props.selProduct);
        
        
    }

    deleteBatch() {
        axios.post(backendde.backendUrl+'Batch/delete/'+this.props.selProduct+'/' + this.props.obj.batchNo)
            .then((res) => {
                console.log('Batch successfully deleted!')
                this.props.newProducts(res.data);
            }).catch((error) => {
                console.log(error)
            });
    }


    
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.batchNo}
                </td>
                <td>
                    {this.props.obj.expDate}
                </td>
                <td>
                    Rs. {this.props.obj.wholePrice.toFixed(2)}
                </td>
                <td>
                    Rs. {this.props.obj.retailPrice.toFixed(2)}
                </td>
                <td>
                    <button onClick={this.deleteBatch} className="btn btn-danger">delete</button>
                </td>
            </tr>
        );
    }
}

export default BatchList;