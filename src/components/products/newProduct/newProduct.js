import React, { Component } from 'react';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import axios from 'axios';

class newProduct extends Component {

    constructor(props){
        super(props);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeBatchNo=this.onChangeBatchNo.bind(this);
        this.onChangeExpireDate=this.onChangeExpireDate.bind(this);
        this.onChangeWholePrice=this.onChangeWholePrice.bind(this);
        this.onChangeRetailPrice=this.onChangeRetailPrice.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            productName:'',
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:'',
            currentStock:0
        }
    }
    onChangeProductName(e){
        this.setState({
            productName:e.target.value,
            
        });
    }
    onChangeBatchNo(e){
        this.setState({
            batchNo:e.target.value,
        });
    }
    onChangeExpireDate(e){
        this.setState({
            expDate:e.target.value,
        });
    }
    onChangeWholePrice(e){
        this.setState({
            wholePrice:e.target.value,
        });
    }
    onChangeRetailPrice(e){
        this.setState({
            retailPrice:e.target.value,
        });
    }
    onSubmit(e){
        e.preventDefault();
        console.log(`The value are ${this.state.productName},${this.state.batchNo}, ${this.state.expDate}, ${this.state.wholePrice} and ${this.state.retailPrice}`);
        const obj={
            productName:this.state.productName,
            batches:[
                {batchNo:this.state.batchNo,
                expDate:this.state.expDate,
                wholePrice:this.state.wholePrice,
                retailPrice:this.state.retailPrice,
                currentStock:0
                }]
        }
        axios.post('https://stock-management-server.herokuapp.com/newProduct/add',obj).then(res=>console.log(res.data));
        this.setState({
            productName:'',
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:'',
            currentStock:0
        })
    }

    
    render() {
        return (
            <div className="container">
                <h1>Add new product to stock</h1><br></br>
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control value={this.productName} onChange={this.onChangeProductName} placeholder="New Product Name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>First Batch Number</Form.Label>
                    <Form.Control value={this.batchNo} onChange={this.onChangeBatchNo} placeholder="batch number" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Expire date</Form.Label>
                    <Form.Control value={this.expDate} onChange={this.onChangeExpireDate} placeholder="MM/YYYY" />
                    
                </Form.Group>
               
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Wholesale price per unit</Form.Label>
                    <Form.Control value={this.wholePrice} onChange={this.onChangeWholePrice} placeholder="Wholesale price" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Retail price per unit</Form.Label>
                    <Form.Control value={this.retailPrice} onChange={this.onChangeRetailPrice} placeholder="Retail price" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add product
                </Button>
                </Form>
            </div>
        );
    }
}

export default newProduct;