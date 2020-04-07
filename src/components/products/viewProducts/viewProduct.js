import React, { Component } from 'react';
import {Modal,Button,FormControl} from 'react-bootstrap';

import axios from 'axios';
import ViewTable from './viewTable';

const backendde= require('../../../backendde');
class viewProduct extends Component {

    constructor(props){
        super(props);
        this.modalClose=this.modalClose.bind(this);
        this.onChangeNewName=this.onChangeNewName.bind(this);
        this.onSubmitNewName=this.onSubmitNewName.bind(this);
        this.callbackEdit=this.callbackEdit.bind(this);
        
        this.state={
            products:[],
            batches:[],
            editModalToggle:false,
            selectedProduct:'',
            newName:'new'
        };

    }

    componentDidMount(){
        axios.get(backendde.backendUrl+'viewProduct/view')
            .then(response =>{
                this.setState({products:response.data,});
                console.log(this.state.products);
            })
        .catch(function (error){
            console.log(error);
        });
    }
    ViewProductTableRow(){
        return this.state.products.map(function(object,i){
            return <ViewTable key={i} obj={object} editName={this.callbackEdit}/>;
        }.bind(this));
    }
    modalClose(){
        this.setState({editModalToggle:false});  
    }
    onChangeNewName(e){
        this.setState({newName:e.target.value});
    }
    onSubmitNewName(){
        axios.post(backendde.backendUrl+'viewProduct/editName/'+this.state.selectedProduct._id+'/'+this.state.newName)
            .then(res=>this.setState({products:res.data,
                editModalToggle:false}));
    }
    callbackEdit(object){
        this.setState({
            selectedProduct:object,
            newName:object.productName,
            editModalToggle:true
        })
    }
    render() {
        return (
            <div  className="container">
                <h1>View all products</h1>
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
                                <th colSpan="2">Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewProductTableRow()}
                        </tbody>
                    </table>
                    <Modal show={this.state.editModalToggle} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Product Name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Enter New Name for "{this.state.selectedProduct.productName}"<br></br>-
                            <FormControl value={this.state.newName} onChange={this.onChangeNewName} aria-label="name" />
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.modalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSubmitNewName}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
}

export default viewProduct;