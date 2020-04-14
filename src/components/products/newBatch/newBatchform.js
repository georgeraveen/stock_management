import React, { Component } from 'react';

import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import axios from 'axios';

const backendde= require('./../../../backendde');

class NewBatchform extends Component {
    constructor(props){
        super(props);
        this.onChangeBatchNo=this.onChangeBatchNo.bind(this);
        this.onChangeExpireDate=this.onChangeExpireDate.bind(this);
        this.onChangeWholePrice=this.onChangeWholePrice.bind(this);
        this.onChangeRetailPrice=this.onChangeRetailPrice.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        // this.successAlert=this.successAlert.bind(this);

        this.state={
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:'',
            currentStock:0,
            successAlt:false,
            failAlt:false,
            newProducts:''
        };
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
        console.log(`The value are ${this.state.batchNo}, ${this.state.expDate}, ${this.state.wholePrice} and ${this.state.retailPrice}`);
        const obj=
                {batchNo:this.state.batchNo,
                expDate:this.state.expDate,
                wholePrice:this.state.wholePrice,
                retailPrice:this.state.retailPrice,
                currentStock:0
                
        }

        axios.post(backendde.backendUrl+'Batch/add/'+this.props.selProduct,obj)
            .then(res=> {
                this.props.newProducts(res.data.products);

                var newobj = res.data.products.find(e=> e._id===this.props.selProduct);
                var batchLength = newobj.batches.length;
                
                const movementObj={
                    productID:this.props.selProduct,
                    batchID:newobj.batches[batchLength-1]._id,
                    movement:{
                        recordDate: new Date(),
                        moveType: 'Add New Product',
                        moveID: 'Initial',
                        preStock:0,
                        quantity:0
                    }
                }
                console.log(res.data.batch);
                axios.post(backendde.backendUrl+'stockMove/newRecord',movementObj).then(res=>console.log(res));
                
            });

        this.setState({
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:'',
            currentStock:0
        })
    }
    
    render() {
        return (
            <div>
                {/* <Alert variant="success" isOpen={this.state.successAlt} onClose={() => this.setState({successAlt:false})} dismissible>
                    <Alert.Heading>New batch successfully added</Alert.Heading>
                </Alert> */}
                <br></br>
                <Form onSubmit={this.onSubmit}>
                <Row>
                <Form.Group as={Col}  controlId="formBasicPassword">
                    <Form.Label>Batch Number</Form.Label>
                    <Form.Control type='text' required value={this.state.batchNo} onChange={this.onChangeBatchNo} placeholder="batch number" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Expire date</Form.Label>
                    <Form.Control type='date' required value={this.state.expDate} onChange={this.onChangeExpireDate} />
                    
                </Form.Group>
               
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Wholesale price per unit</Form.Label>
                    <Form.Control type='number' step=".01" required value={this.state.wholePrice} onChange={this.onChangeWholePrice} placeholder="Wholesale price" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Retail price per unit</Form.Label>
                    <Form.Control type='number' step=".01" required value={this.state.retailPrice} onChange={this.onChangeRetailPrice} placeholder="Retail price" />
                </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Add Batch No
                </Button>
                </Form>

            </div>
        );
    }
}

export default NewBatchform;