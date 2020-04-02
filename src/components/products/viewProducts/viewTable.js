import React, { Component } from 'react';
import ViewBatch from './ViewBatch';


import axios from 'axios';
const backendde= require('./../../../backendde');
class ViewTable extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        
    }

    editProduct(){

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
            return <ViewBatch obj1={object1} key={j}/>;
        });
    }

    render() {
        return (
            <React.Fragment>
            <tr>
                <td colSpan='5'>
                    {this.props.obj.productName}
                </td>
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