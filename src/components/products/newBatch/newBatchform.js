import React, { Component } from 'react';

import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import axios from 'axios';

class NewBatchform extends Component {
    constructor(props){
        super(props);
        this.onChangeBatchNo=this.onChangeBatchNo.bind(this);
        this.onChangeExpireDate=this.onChangeExpireDate.bind(this);
        this.onChangeWholePrice=this.onChangeWholePrice.bind(this);
        this.onChangeRetailPrice=this.onChangeRetailPrice.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:''
        };
        // console.log(this.props.selProduct);
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
                retailPrice:this.state.retailPrice
                
        }
        axios.post('http://localhost:4000/Batch/add/'+this.props.selProduct,obj).then(res=>console.log(res.data));
        this.setState({
            batchNo:'',
            expDate:'',
            wholePrice:'',
            retailPrice:''
        })
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                <Row>
                <Form.Group as={Col}  controlId="formBasicPassword">
                    <Form.Label>Batch Number</Form.Label>
                    <Form.Control value={this.batchNo} onChange={this.onChangeBatchNo} placeholder="batch number" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Expire date</Form.Label>
                    <Form.Control value={this.expDate} onChange={this.onChangeExpireDate} placeholder="MM/YYYY" />
                    
                </Form.Group>
               
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Wholesale price per unit</Form.Label>
                    <Form.Control value={this.wholePrice} onChange={this.onChangeWholePrice} placeholder="Wholesale price" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicPassword">
                    <Form.Label>Retail price per unit</Form.Label>
                    <Form.Control value={this.retailPrice} onChange={this.onChangeRetailPrice} placeholder="Retail price" />
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