import React, { Component } from 'react';
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';

import axios from 'axios';

import ViewINVCTable from './ViewInvoiceTable'

const backendde= require('../../../backendde');
const spacePro='   ';
var INVCtotal=0;

class newInvoice extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        this.selectBatch=this.selectBatch.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddProduct=this.onAddProduct.bind(this);
        this.ViewINVCCartTableRow=this.ViewINVCCartTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.onSubmitINVC=this.onSubmitINVC.bind(this);
        this.onChangeRemarks=this.onChangeRemarks.bind(this);
        
        this.state={
            products:[],
            batches:[{batchNo:'Batch',expDate:'Exp'}],
            selectedProduct:'',
            selectedBatch:'',
            batchDetails:[],
            quantity:0,
            batch:'',
            temp:0,   //just to refresh page
            cartProducts:[],
            remarks:'',
            qtyBoxErrMsg:''
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
        axios.get(backendde.backendUrl+'addINVC/viewCart')
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
        if(e.target.value<=this.state.batchDetails.currentStock){
            this.setState({
                qtyBoxErrMsg:'',
                quantity:e.target.value
            });    
        }
        else{
            this.setState({
                qtyBoxErrMsg:'stock error'
            }); 
        }
        
    }
    onAddProduct(e){
        e.preventDefault();
        console.log(`The value are ${this.state.selectedProduct},${this.state.selectedBatch}, ${this.state.quantity}`);
        const obj={
            productID:this.state.selectedProduct,
            batchID:this.state.selectedBatch,
            quantity:this.state.quantity
        }

        axios.post(backendde.backendUrl+'addINVC/addProductINVC',obj).then(res=>console.log(res.data));

        this.setState({
            batches:[],
            selectedProduct:'',
            selectedBatch:'',
            batchDetails:[],
            quantity:0,
            batch:''
        })
        
    }
    onChangeRemarks(e){
        this.setState({
            remarks:e.target.value
        });
    }
    ViewINVCCartTableRow(){
        return this.state.cartProducts.map(function(object,i){
            return <ViewINVCTable obj={object} key={i} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        INVCtotal=INVCtotal+rowsum;
        this.setState({temp: 0}); //just to refresh page
    }
    onSubmitINVC(){
        var cart=[]; 
        this.state.cartProducts.map(function(object,i){
            var a=this.state.products.find(e => e._id === object.productID).batches.find(e => e._id === object.batchID);
            object.preStock=a.currentStock;
            cart.push(object);
            const qty={
                quantity: a.currentStock-object.quantity};
            axios.post(backendde.backendUrl+'Batch/INVCstock/'+object.productID+'/'+object.batchID,qty).then(res=>console.log(res.data));
        }.bind(this));
        const INVCobj={
            items:cart,
            remarks:this.state.remarks
        }
        axios.post(backendde.backendUrl+'addINVC/submitINVC',INVCobj).then(res=>console.log(res.data));
        axios.delete(backendde.backendUrl+'addINVC/deleteINVCcart').then(res=>console.log(res.data));

        // console.log(INVCobj);
    }
    render() {
        return (

            <div className="container">
                <h1>Create New Invoice</h1>
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
                        defaultValue={this.state.batches[0]}
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
                <Form.Group as={Col}>
                    <Form.Label>Available Stock</Form.Label>
                    <br></br>
                    <Form.Label>{this.state.batchDetails.currentStock}</Form.Label>   
                </Form.Group>
                <Form.Group as={Col} >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control value={this.state.quantity} onChange={this.onChangeQty} placeholder="qty" />
                        <Form.Label><font color='red'>{this.state.qtyBoxErrMsg}</font></Form.Label>
                </Form.Group>
                </Row>
                <Row>
                <Button variant="primary" type="submit">
                    Add product to invoice cart
                </Button>
                </Row>
                </Form>
                <br></br>
                <div  className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Add some Remarks here</span>
                    </div>
                    <textarea onChange={this.onChangeRemarks} className="form-control" aria-label="With textarea"></textarea>

                <Button onClick={this.onSubmitINVC} variant="success">
                    Submit Invoice cart
                </Button>
                </div>
                
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
                                    Retail Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Sum
                                </th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewINVCCartTableRow()}
                            <tr>
                                <td colSpan='5'><b>Total</b></td>
                                <td align="right"><b>Rs. {INVCtotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                
                
                <br></br>
            </div>
         
         );
    }
    
}

export default newInvoice;
