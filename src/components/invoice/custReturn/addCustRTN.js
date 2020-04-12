import React, { Component } from 'react';
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';

import axios from 'axios';

import ViewCustRTNTable from './ViewCustRTNTable'

const backendde= require('../../../backendde');
const spacePro='   ';
var CustRTNtotal=0;
let inputRef;
class addCustRTN extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        this.selectBatch=this.selectBatch.bind(this);
        this.onChangeQty=this.onChangeQty.bind(this);
        this.onAddProduct=this.onAddProduct.bind(this);
        this.ViewCustRTNCartTableRow=this.ViewCustRTNCartTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.onDeleteCartItem=this.onDeleteCartItem.bind(this);
        this.onSubmitCustRTN=this.onSubmitCustRTN.bind(this);
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

            validated:false, 
            setValidated:false
        };

    }

    componentDidMount(){
        //form data
        axios.get(backendde.backendUrl+'viewProduct/view')
            .then(response =>{
                this.setState({products:response.data});
                inputRef.focus();
            })
        .catch(function (error){
            console.log('form data');
            console.log(error);
        });

        //cart table data
        axios.get(backendde.backendUrl+'addCustRTN/viewCart')
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
                selectedBatch:values.batches[0]._id,
                batchDetails:values.batches[0]
            }, () => {
                console.log(this.state.selectedProduct);
                console.log(this.state.batches);
            });
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
        this.setState({
            quantity:e.target.value
        });
    }
    onAddProduct(e){
        const form=e.currentTarget;
        if(form.checkValidity()===false || this.state.selectedProduct===''){
            e.preventDefault();
            e.stopPropagation();
        }
        else{
            e.preventDefault();
            const obj={
                productID:this.state.selectedProduct,
                batchID:this.state.selectedBatch,
                quantity:this.state.quantity
            }

            axios.post(backendde.backendUrl+'addCustRTN/addProductCustRTN',obj).then(
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
            inputRef.focus();
        }
        this.setState({setValidated:true,validated:true})    
    }
    onChangeRemarks(e){
        this.setState({
            remarks:e.target.value
        });
    }
    ViewCustRTNCartTableRow(){
        return this.state.cartProducts.map(function(object,i){
            const details={
                productName:this.state.products.find(e=> e._id===object.productID).productName,
                batchDetails:this.state.products.find(e=> e._id===object.productID).batches.find(f=> f._id===object.batchID)
            }
            return <ViewCustRTNTable obj={object} batch={details} key={i} callbackSum = {this.callbackRowSum}  deleteItem={this.onDeleteCartItem}/>;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        CustRTNtotal=CustRTNtotal+rowsum;
        this.setState({temp: 0}); //just to refresh page
    }
    onDeleteCartItem(newCart){
        this.setState({cartProducts:newCart});
    }
    onSubmitCustRTN(){
        var cart=[]; 
        this.state.cartProducts.map(function(object,i){
            var a=this.state.products.find(e => e._id === object.productID).batches.find(e => e._id === object.batchID);
            object.preStock=a.currentStock;
            cart.push(object);
            const qty={
                quantity: a.currentStock+object.quantity};
            axios.post(backendde.backendUrl+'Batch/CustRTNstock/'+object.productID+'/'+object.batchID,qty).then(res=>console.log(res.data));
        }.bind(this));
        const CustRTNobj={
            items:cart,
            remarks:this.state.remarks
        }
        axios.post(backendde.backendUrl+'addCustRTN/submitCustRTN',CustRTNobj).then(res=>console.log(res.data));
        axios.delete(backendde.backendUrl+'addCustRTN/deleteCustRTNcart')
            .then(res=>{CustRTNtotal=0;
                this.setState({cartProducts:res.data});
                console.log(res.data)});
        this.setState({remarks:''});
    }
    render() {
        return (

            <div className="container">
                <h1>Add Customer Return</h1>
                <br></br>
                
                <Form noValidate validated={this.state.validated} onSubmit={this.onAddProduct} >
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
                        renderInput={params => <TextField required {...params} inputRef={input => {inputRef = input;}} label="Select Product Name" variant="outlined" />}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Select Batch Number</Form.Label>
                    <Autocomplete
                        id="combo-box-demo"
                        autoHighlight
                        openOnFocus
                        autoComplete
                        options={this.state.batches}
                        getOptionLabel={option => option.batchNo +spacePro + option.expDate}
                        style={{ width: 300 }}
                        value={this.state.batches.find(e=> e._id===this.state.selectedBatch)}
                        onChange={this.selectBatch}
                        inputValue={this.state.empty}
                        renderInput={params => <TextField required {...params} label="Select Batch Number" variant="outlined" />}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Retail Price</Form.Label>
                    <br></br>
                    <Form.Label>{this.state.batchDetails.retailPrice}</Form.Label>   
                </Form.Group>
                <Form.Group as={Col}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control required type="number" value={this.state.quantity} onChange={this.onChangeQty} placeholder="qty" />
                        <Form.Control.Feedback type="invalid">Enter valid number.</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row>
                <Button variant="primary" type="submit">
                    Add product to Customer Return cart
                </Button>
                </Row>
                </Form>
                <br></br>
                <div  className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Add some Remarks here</span>
                    </div>
                    <textarea onChange={this.onChangeRemarks} className="form-control" aria-label="With textarea"></textarea>

                <Button onClick={this.onSubmitCustRTN} variant="success">
                    Submit Customer Return cart
                </Button>
                </div>
                
                <br></br>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
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
                                    Sum (Retail)
                                </th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewCustRTNCartTableRow()}
                            <tr>
                                <td colSpan='6'><b>Total</b></td>
                                <td align="right"><b>Rs. {CustRTNtotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                
                
                <br></br>
            </div>
         
         );
    }
    
}

export default addCustRTN;
