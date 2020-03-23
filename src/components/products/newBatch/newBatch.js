import React, { Component } from 'react';
import ProductListDropdown from './productListDropdown';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import BatchList from './batchList';


import axios from 'axios';

class newBatch extends Component {
    constructor(props){
        super(props);
        this.onSelectProduct=this.onSelectProduct.bind(this);
        
        this.state={
            products:[],
            batches:[],
            selectedProduct:''
        };

    }

    componentDidMount(){
        axios.get('http://localhost:4000/newProduct/view')
            .then(response =>{
                this.setState({products:response.data});
                console.log('abc');
                console.log(this.state.products);
                console.log('abc');
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    dropdownProduct(){
        return this.state.products.map(function(object,i){
            return <ProductListDropdown obj={object} key={i}/>;
        });
    }
    onSelectProduct(e){
        this.setState({
            selectedProduct:e.target.value
        });
    }
    displayBatchList(){
        var a=this.state.selectedProduct;
        return this.state.products.map(function(object,i){
            if(a==(object['productName'])){
                // console.log(object);
                return object.batches.map(function(object1,j){
                    // console.log(object1);
                    return <BatchList obj={object1} key={j}/>;
                });
            };
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Add new batch to product</h1><br></br>
               
                <div className="form-group">
                <label htmlFor="sel1">Select product:</label>
                <select onChange={this.onSelectProduct} className="form-control" id="sel1">
                    <option>select</option>
                    {this.dropdownProduct()};
                </select>
                <br></br>
                
                </div>    
                      
                <div>
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
                            <tr>
                                <th>
                                    Batch No
                                </th>
                                <th>
                                    Expire Date
                                </th>
                                <th>
                                    Wholesale Price
                                </th>
                                <th>
                                    Retail Price
                                </th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayBatchList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default newBatch;