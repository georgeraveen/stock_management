import React, { Component } from 'react';
import { Modal, Button, FormControl, Form, Col, Row } from 'react-bootstrap';

import axios from 'axios';
import ViewTable from './viewTable';

const backendde = require('../../../backendde');
class viewProduct extends Component {

    constructor(props) {
        super(props);
        this.modalClose = this.modalClose.bind(this);
        this.modalBatchClose = this.modalBatchClose.bind(this);
        this.onChangeNewName = this.onChangeNewName.bind(this);
        this.onChangeNewStockMaintain = this.onChangeNewStockMaintain.bind(this);
        this.onSubmitNewName = this.onSubmitNewName.bind(this);
        this.callbackEdit = this.callbackEdit.bind(this);

        this.callbackEditBatch = this.callbackEditBatch.bind(this);
        this.onChangenewBatchNo = this.onChangenewBatchNo.bind(this);
        this.onChangenewExpireDate = this.onChangenewExpireDate.bind(this);
        this.onChangenewWholePrice = this.onChangenewWholePrice.bind(this);
        this.onChangenewRetailPrice = this.onChangenewRetailPrice.bind(this);
        this.onSubmitnewBatchDetails = this.onSubmitnewBatchDetails.bind(this);

        this.state = {
            products: [],
            batches: [],
            editModalToggle: false,
            editBatchModalToggle: false,
            selectedProduct: '',
            selectedBatch: {
                bID: '',
                pID: ''
            },
            newName: 'new',
            newStockMaintain: 0,
            newbatchNo: '',
            newexpDate: '',
            newwholePrice: '',
            newretailPrice: '',
        };

    }

    componentDidMount() {
        axios.get(backendde.backendUrl + 'viewProduct/view')
            .then(response => {
                this.setState({ products: response.data, });
                console.log(this.state.products);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    ViewProductTableRow() {
        return this.state.products.map(function (object, i) {
            return <ViewTable key={i} obj={object} editName={this.callbackEdit} editBatchinfo={this.callbackEditBatch} />;
        }.bind(this));
    }
    modalClose() {
        this.setState({ editModalToggle: false });
    }
    onChangeNewName(e) {
        this.setState({ newName: e.target.value });
    }
    onChangeNewStockMaintain(e) {
        this.setState({ newStockMaintain: e.target.value });
    }
    onSubmitNewName() {
        axios.post(backendde.backendUrl + 'viewProduct/editName/' + this.state.selectedProduct._id + '/' + this.state.newName + '/' + this.state.newStockMaintain)
            .then(res => this.setState({
                products: res.data,
                editModalToggle: false
            }));
    }
    callbackEdit(object) {
        this.setState({
            selectedProduct: object,
            newName: object.productName,
            newStockMaintain: object.stockMaintain,
            editModalToggle: true
        })
    }
    modalBatchClose() {
        this.setState({ editBatchModalToggle: false });
    }
    callbackEditBatch(bDetails) {
        this.setState({
            selectedBatch: bDetails,
            newbatchNo: this.state.products.find(e => e._id === bDetails.pID).batches.find(f => f._id === bDetails.bID).batchNo,
            newexpDate: this.state.products.find(e => e._id === bDetails.pID).batches.find(f => f._id === bDetails.bID).expDate,
            newwholePrice: this.state.products.find(e => e._id === bDetails.pID).batches.find(f => f._id === bDetails.bID).wholePrice,
            newretailPrice: this.state.products.find(e => e._id === bDetails.pID).batches.find(f => f._id === bDetails.bID).retailPrice,
            editBatchModalToggle: true
        });
    }
    onChangenewBatchNo(e) {
        this.setState({
            newbatchNo: e.target.value,
        });
    }
    onChangenewExpireDate(e) {
        this.setState({
            newexpDate: e.target.value,
        });
    }
    onChangenewWholePrice(e) {
        this.setState({
            newwholePrice: e.target.value,
        });
    }
    onChangenewRetailPrice(e) {
        this.setState({
            newretailPrice: e.target.value,
        });
    }
    onSubmitnewBatchDetails(e) {
        const obj = {
            newbatchNo: this.state.newbatchNo,
            newexpDate: this.state.newexpDate,
            newwholePrice: this.state.newwholePrice,
            newretailPrice: this.state.newretailPrice,
        }
        axios.post(backendde.backendUrl + 'Batch/editBatch/' + this.state.selectedBatch.pID + '/' + this.state.selectedBatch.bID, obj)
            .then(res => this.setState({
                products: res.data,
                editBatchModalToggle: false
            }));
    }
    render() {
        return (
            <div className="container">
                <h1>View all products</h1>
                <table className="table table-striped" style={{ marginTop: 20 }}>
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
                            <th colSpan="2">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.ViewProductTableRow()}
                    </tbody>
                </table>
                <Modal show={this.state.editModalToggle} onHide={this.modalBatchClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Enter New Name for "{this.state.selectedProduct.productName}"<br></br>-
                            <FormControl value={this.state.newName} onChange={this.onChangeNewName} aria-label="name" />
                        Enter Maintain stock for "{this.state.selectedProduct.productName}"<br></br>-
                            <FormControl value={this.state.newStockMaintain} onChange={this.onChangeNewStockMaintain} aria-label="name" type="number" />
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
                <Modal show={this.state.editBatchModalToggle} onHide={this.modalBatchClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Batch Details for "{this.state.selectedBatch.bID}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        For "{this.state.selectedBatch.bID}"<br></br>-
                            <Form>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Batch Number</Form.Label>
                                <Form.Control value={this.state.newbatchNo} onChange={this.onChangenewBatchNo} placeholder="batch number" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Expire date</Form.Label>
                                <Form.Control value={this.state.newexpDate} onChange={this.onChangenewExpireDate} placeholder="MM/YYYY" />

                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Wholesale price per unit</Form.Label>
                                <Form.Control value={this.state.newwholePrice} onChange={this.onChangenewWholePrice} placeholder="Wholesale price" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Retail price per unit</Form.Label>
                                <Form.Control value={this.state.newretailPrice} onChange={this.onChangenewRetailPrice} placeholder="Retail price" />
                            </Form.Group>
                            <Row>
                                <Button as={Col} variant="danger" onClick={this.onSubmitnewBatchDetails}>
                                    Save Changes
                                </Button>
                                <Button as={Col} variant="secondary" onClick={this.modalBatchClose}>
                                    Cancel
                                </Button>
                            </Row>
                        </Form>

                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default viewProduct;