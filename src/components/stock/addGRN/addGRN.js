import React, { Component } from 'react';
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';

import axios from 'axios';

import ViewGRNTable from './ViewGRNTable'

const backendde= require('./../../../backendde');
const spacePro='   ';

class AddGRN extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        this.selectBatch=this.selectBatch.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddProduct=this.onAddProduct.bind(this);
        this.ViewGRNCartTableRow=this.ViewGRNCartTableRow.bind(this)
        
        this.state={
            products:[],
            batches:[],
            selectedProduct:'',
            selectedBatch:'',
            batchDetails:[],
            quantity:0,
            batch:'',

            cartProducts:[]
        };

    }

    componentDidMount(){
        //form data
        axios.get(backendde.backendUrl+'viewProduct/view')
            .then(response =>{
                this.setState({products:response.data});
            })
        .catch(function (error){
            console.log('form data');
            console.log(error);
        });

        //cart table data
        axios.get(backendde.backendUrl+'addGRN/viewCart')
            .then(response =>{
                this.setState({cartProducts:response.data});
            })
        .catch(function (error){
            console.log('cart table data');
            console.log(error);
        });
    }
    selectProduct = (event, values) => {
        this.setState({
          selectedProduct: values._id,
          batches:values.batches
        }, () => {
          console.log(this.state.selectedProduct);
          console.log(this.state.batches);
        });
    }
    selectBatch = (event, values) => {
        this.setState({
          selectedBatch: values._id,
          batchDetails: values,
            batch:values.batchNo+'  '+values.expDate
        }, () => {
          console.log(this.state.selectedBatch);
          
        });
    }
    onChangeQty(e){
        this.setState({
            quantity:e.target.value
        });
    }
    onAddProduct(e){
        e.preventDefault();
        console.log(`The value are ${this.state.selectedProduct},${this.state.selectedBatch}, ${this.state.quantity}`);
        const obj={
            productID:this.state.selectedProduct,
            batchID:this.state.selectedBatch,
            quantity:this.state.quantity
        }

        axios.post(backendde.backendUrl+'addGRN/addProductGRN',obj).then(res=>console.log(res.data));

        this.setState({
            batches:[],
            selectedProduct:'',
            selectedBatch:'',
            batchDetails:[],
            quantity:0,
            batch:''
        })
        
    }
    ViewGRNCartTableRow(){
        return this.state.cartProducts.map(function(object,i){
            return <ViewGRNTable obj={object} key={i}/>;
        });
    }
    
    render() {
        return (

            <div className="container">
                <h1>Add GRN stock</h1>
                <br></br>
                
                <Form onSubmit={this.onAddProduct} >
                    <Row>
                <Form.Group as={Col}>
                    <Form.Label>Select Product Name</Form.Label>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.products}
                        getOptionLabel={option => option.productName}
                        style={{ width: 300 }}
                        onChange={this.selectProduct}
                        renderInput={params => <TextField {...params} label="Select Product Name" variant="outlined" />}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Select Batch Number</Form.Label>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.state.batches}
                        getOptionLabel={option => option.batchNo +spacePro + option.expDate}
                        style={{ width: 300 }}
                        defaultValue={[this.state.batches[0]]}
                        onChange={this.selectBatch}
                        inputValue={this.state.empty}
                        renderInput={params => <TextField {...params} label="Select Batch Number" variant="outlined" />}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Retail Price</Form.Label>
                    <br></br>
                    <Form.Label>{this.state.batchDetails.retailPrice}</Form.Label>   
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control value={this.state.quantity} onChange={this.onChangeQty} placeholder="qty" />
                </Form.Group>
                </Row>
                
                <Button variant="primary" type="submit">
                    Add product
                </Button>
                </Form>
                <br></br>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
                            <tr><th>
                                    Product Name
                                </th>
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
                                <th>
                                    Quantity
                                </th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewGRNCartTableRow()}
                        </tbody>
                    </table>
                
                
                <br></br>
            </div>
         
         );
    }
    
}

export default AddGRN;
