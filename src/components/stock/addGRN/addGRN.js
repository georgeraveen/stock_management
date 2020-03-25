import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import axios from 'axios';

class AddGRN extends Component {
    render() {
        return (
            <div className="container">
            <h1>Add GRN stock</h1><br></br>
            <Form >
            <Form.Group >
                <Form.Label>Select Product Name</Form.Label>
                
            </Form.Group>

            <Form.Group >
                <Form.Label>Select Batch Number</Form.Label>
                
            </Form.Group>
            <Form.Group >
                <Form.Label>Expire date</Form.Label>
               
                
            </Form.Group>
           
            
            <Button variant="primary" type="submit">
                Add product
            </Button>
            </Form>
        </div>
        );
    }
}

export default AddGRN;