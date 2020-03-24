import React, { Component } from 'react';
import axios from 'axios';


class BatchList extends Component {
    constructor(props) {
        super(props);
        this.deleteBatch = this.deleteBatch.bind(this);
        console.log(this.props.selProduct);
    }

    deleteBatch() {
        axios.post('http://localhost:4000/Batch/delete/'+this.props.selProduct+'/' + this.props.obj.batchNo)
            .then((res) => {
                console.log('Batch successfully deleted!')
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
                    {this.props.obj.wholePrice}
                </td>
                <td>
                    {this.props.obj.retailPrice}
                </td>
                <td>
                    <button onClick={this.deleteBatch} className="btn btn-danger">delete</button>
                </td>
            </tr>
        );
    }
}

export default BatchList;