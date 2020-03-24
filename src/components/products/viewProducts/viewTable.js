import React, { Component } from 'react';

import axios from 'axios';

class viewTable extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        
    }

    editProduct(){

    }

    deleteProduct(){
        axios.delete('http://localhost:4000/viewProduct/delete/' + this.props.obj._id)
            .then((res) => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            });
        
        
    }

    render() {
        return (
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
        );
    }
}

export default viewTable;