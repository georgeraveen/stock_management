import React, { Component } from 'react';
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row,Col,InputGroup,FormControl} from 'react-bootstrap';

import axios from 'axios';

import ViewINVCTable from './ViewInvoiceTable'
import { Container } from '@material-ui/core';

const backendde= require('../../../backendde');
const spacePro='   ';
var INVCtotal=0;
var NetTotal=0;

class newInvoice extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        this.selectBatch=this.selectBatch.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddProduct=this.onAddProduct.bind(this);
        this.onChangeDiscount=this.onChangeDiscount.bind(this);
        this.ViewINVCCartTableRow=this.ViewINVCCartTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.onDeleteCartItem=this.onDeleteCartItem.bind(this);
        this.onSubmitINVC=this.onSubmitINVC.bind(this);
        this.onChangeRemarks=this.onChangeRemarks.bind(this);
        
        
        this.state={
            products:[],
            batches:[{_id:'default',batchNo:'Batch',expDate:'Exp'}],
            selectedProduct:'',
            selectedBatch:'default',
            batchDetails:[],
            quantity:0,
            batch:'',
            temp:0,   //just to refresh page
            cartProducts:[],
            remarks:'',
            discount:0,
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
        if(values!=null){
            this.setState({
            selectedProduct: values._id,
            batches:values.batches,        
            });
            if(values.batches.filter(e=>e.currentStock>0)[0]!=null){
                this.setState({
                    selectedBatch:values.batches.filter(e=>e.currentStock>0)[0]._id,   ///select default batch
                    batchDetails: values.batches.filter(e=>e.currentStock>0)[0]         ///select default batch
                })
            }
        }
    }
    selectBatch = (event, values) => {
        if(values!=null){
            this.setState({
            selectedBatch: values._id,
            batchDetails: values,
                batch:values.batchNo+'  '+values.expDate
            }, () => {
            console.log(this.state.selectedBatch);
            
            });
        }
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

        axios.post(backendde.backendUrl+'addINVC/addProductINVC',obj).then(
            res=>{
                console.log(res);
                this.setState({cartProducts:res.data}); //refresh cart
            });

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
    onChangeDiscount(e){
        if(e.target.value==''){
            this.setState({
                discount:0
            })
            NetTotal=INVCtotal;
            this.setState({
                temp:0
            }) 
        }
        else{
            this.setState({
                discount:e.target.value
            })
            NetTotal=INVCtotal*(100-e.target.value)/100;
            this.setState({
                temp:0
            })
        }
       
    }
    ViewINVCCartTableRow(){
        return this.state.cartProducts.map(function(object,i){
            const details={
                productName:this.state.products.find(e=> e._id===object.productID).productName,
                batchDetails:this.state.products.find(e=> e._id===object.productID).batches.find(f=> f._id===object.batchID)
            }
            return  <ViewINVCTable obj={object} batch={details} key={i} callbackSum = {this.callbackRowSum} deleteItem={this.onDeleteCartItem} />;
        }.bind(this));      
    }
    callbackRowSum = (rowsum) => {
        INVCtotal=INVCtotal+rowsum;
        NetTotal=INVCtotal;
        this.setState({temp: 0}); //just to refresh page
    }
    onDeleteCartItem(newCart){
        this.setState({cartProducts:newCart});
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
            discount:this.state.discount,
            remarks:this.state.remarks
        }
        axios.post(backendde.backendUrl+'addINVC/submitINVC',INVCobj).then(res=>console.log(res.data));
        axios.delete(backendde.backendUrl+'addINVC/deleteINVCcart')
            .then(res=>{INVCtotal=0;NetTotal=0;
                        this.setState({cartProducts:res.data});
                        console.log(res.data)});
        
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
                        autoHighlight
                        openOnFocus
                        autoComplete
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
                        autoHighlight
                        openOnFocus
                        autoComplete
                        options={this.state.batches.filter(e=>e.currentStock>0)}
                        getOptionLabel={option => option.batchNo +spacePro + option.expDate}
                        style={{ width: 300 }}
                        value={this.state.batches.find(e=> e._id==this.state.selectedBatch)}
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
                <Container>
                    <Row>
                        <Col xs={3}>
                <InputGroup  className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text>Discount</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="discount" value={this.state.discount} onChange={this.onChangeDiscount} />
                    <InputGroup.Append>
                    <InputGroup.Text> % </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                </Col>
                <Col >
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>Add some Remarks here</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" onChange={this.onChangeRemarks} aria-label="With textarea" />
                </InputGroup>
                </Col>
                <Button  onClick={this.onSubmitINVC} variant="success">
                    Submit Invoice cart
                </Button>
               
                </Row>
                </Container>
                
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
                            <tr>
                                <td colSpan='5'><b>Discount</b></td>
                                <td align="right"><b>{this.state.discount} %</b></td>
                            </tr>
                            <tr>
                                <td colSpan='5'><b>Grand Total</b></td>
                                <td align="right"><b>Rs. {NetTotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                
                
                <br></br>
            </div>
         
         );
    }
    
}

export default newInvoice;
