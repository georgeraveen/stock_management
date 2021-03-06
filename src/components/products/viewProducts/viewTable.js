import React, { Component } from 'react';
import ViewBatch from './ViewBatch';


import axios from 'axios';
const backendde= require('./../../../backendde');
class ViewTable extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct=this.editProduct.bind(this);
        this.callbackEditBatch=this.callbackEditBatch.bind(this);
    }

    editProduct(){
        this.props.editName(this.props.obj)
    }
    deleteProduct(){

        axios.delete(backendde.backendUrl+'viewProduct/delete/' + this.props.obj._id)

            .then((res) => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            });
        
        
    }
    ViewBatchTableRow(){
        return this.props.obj.batches.map(function(object1,j){
            return <ViewBatch obj1={object1} key1={j} key={j} editbatch={this.callbackEditBatch}/>;
        }.bind(this));
    }
    callbackEditBatch(batchid){
        const editBatchInfo={
            pID:this.props.obj._id,
            bID:batchid
        };
        this.props.editBatchinfo(editBatchInfo);
    }
    
    render() {
        return (
            <React.Fragment>
            <tr className="table-primary">
                <th colSpan='5'>
                    {this.props.obj.productName}
                </th>
                <td>
                    <button onClick={this.editProduct} className="btn btn-primary">edit</button>
                </td>
                <td>
                    <button onClick={this.deleteProduct} className="btn btn-danger">delete</button>
                </td>
            </tr>
            
            
                {this.ViewBatchTableRow()}
           
            </React.Fragment>
        );
    }
}

export default ViewTable;