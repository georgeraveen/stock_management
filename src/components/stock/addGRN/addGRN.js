import React, { Component } from 'react';
// import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';

import axios from 'axios';

const backendde= require('./../../../backendde');

class AddGRN extends Component { 
    constructor(props){
        super(props);
        this.selectProduct=this.selectProduct.bind(this);
        
        this.state={
            products:[],
            batches:[],
            selectedProduct:''
        };

    }

    componentDidMount(){
        axios.get(backendde.backendUrl+'viewProduct/view')
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
    selectProduct(e){
        console.log('asss');
        // this.setState({
        //     selectedProduct:e.target.value,
        // });
        // console.log(this.selectedProduct);
    }

    render() {
        return (
            <div className="container">
                <h1>Add GRN stock</h1><br></br>
            <Form >
                <Row>
            <Form.Group >
                <Form.Label>Select Product Name</Form.Label>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.products}
                    getOptionLabel={option => option.productName}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Select Product Name" variant="outlined" onChange={this.selectProduct} />}
                 />
            </Form.Group>

            <Form.Group >
                <Form.Label>Select Batch Number</Form.Label>
                
            </Form.Group>
            <Form.Group >
                <Form.Label>Expire date</Form.Label>
               
                
            </Form.Group>
            </Row>
            
            <Button variant="primary" type="submit">
                Add product
            </Button>
            </Form>
            <br></br>
            
            </div>
          );
    }
    
}

export default AddGRN;
