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
var GRNtotal=0;

class AddGRN extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        this.selectBatch=this.selectBatch.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddProduct=this.onAddProduct.bind(this);
        this.ViewGRNCartTableRow=this.ViewGRNCartTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.onSubmitGRN=this.onSubmitGRN.bind(this);
        
        this.state={
            products:[],
            batches:[],
            selectedProduct:'',
            selectedBatch:'',
            batchDetails:[],
            quantity:0,
            batch:'',
            temp:0,   //just to refresh page
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
                // console.log(this.state.cartProducts);
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
            return <ViewGRNTable obj={object} key={i} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        GRNtotal=GRNtotal+rowsum;
        this.setState({temp: 0}); //just to refresh page
    }
    onSubmitGRN(){
        var cart=[]; 
        this.state.cartProducts.map(function(object,i){
            var a=this.state.products.find(e => e._id === object.productID).batches.find(e => e._id === object.batchID);
            object.preStock=a.currentStock;
            cart.push(object);
            const qty={
                quantity: a.currentStock+object.quantity};
            axios.post(backendde.backendUrl+'Batch/GRNstock/'+object.productID+'/'+object.batchID,qty).then(res=>console.log(res.data));
        }.bind(this));
        const GRNobj={
            items:cart
        }
        axios.post(backendde.backendUrl+'addGRN/submitGRN',GRNobj).then(res=>console.log(res.data));
        axios.delete(backendde.backendUrl+'addGRN/deleteGRNcart').then(res=>console.log(res.data));

        // console.log(GRNobj);
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
                    <Form.Label>Wholesale Price</Form.Label>
                    <br></br>
                    <Form.Label>{this.state.batchDetails.wholePrice}</Form.Label>   
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control value={this.state.quantity} onChange={this.onChangeQty} placeholder="qty" />
                </Form.Group>
                </Row>
                <Row>
                <Button variant="primary" type="submit">
                    Add product to GRN cart
                </Button>
                </Row>
                </Form>
                <br></br>
                <Button onClick={this.onSubmitGRN} variant="success">
                    Submit GRN cart
                </Button>
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
                                <th>
                                    Sum (Wholesale)
                                </th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewGRNCartTableRow()}
                            <tr>
                                <td colSpan='6'><b>Total</b></td>
                                <td align="right"><b>Rs. {GRNtotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                
                
                <br></br>
            </div>
         
         );
    }
    
}

export default AddGRN;
