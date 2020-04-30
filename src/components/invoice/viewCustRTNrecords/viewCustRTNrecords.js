import React, { Component } from 'react';
import axios from 'axios';
import CustRTNhistoyRow from './CustRTNhistoyRow';
import {Modal, Form, Row, Button, Col} from 'react-bootstrap';
import CustRTNRecordTableRow from './CustRTNRecordTableRow';

const backendde= require('../../../backendde');
var CustRTNtotal=0;
class viewCustRTNrecords extends Component {

    constructor(props){
        super(props);
        this.callbackClickView=this.callbackClickView.bind(this);
        this.ViewCustRTNRecordTableRow=this.ViewCustRTNRecordTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.onChangeStartDate=this.onChangeStartDate.bind(this);
        this.onChangeEndDate=this.onChangeEndDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
        this.state={
            CustRTNhistory:[],
            products:[],
            lgShow:false,
            viewID:'',
            temp:0,
            selectedCustRTNview:{
                createdAt:'',
                items:[{
                    productID:'',
                }]
            },        
            startDate:'',
            endDate:''   
        };
    }
    componentDidMount(){
        // axios.get(backendde.backendUrl+'viewCustRTN/viewCustRTN')
        //     .then(response =>{
        //         this.setState({CustRTNhistory:response.data});
        //         console.log(this.state.CustRTNhistory);
        //     })
        // .catch(function (error){
        //     console.log('hi');
        //     console.log(error);
        // });
        axios.get(backendde.backendUrl+'viewProduct/view')

            .then(response =>{
                this.setState({products:response.data});
                console.log(this.state.products);
            })
        .catch(function (error){
            console.log(error);
        });
    }
    ViewRecordsTableRow(){
        return this.state.CustRTNhistory.map(function(object,i){
            return <CustRTNhistoyRow key={i} obj={object} clickView={this.callbackClickView}/>;
        }.bind(this));
    }
    callbackClickView(ViewMessage){
        
        this.setState({
            viewID:ViewMessage,
            selectedCustRTNview:this.state.CustRTNhistory.find(e => e._id===ViewMessage),
            lgShow:true});
    }
    ViewCustRTNRecordTableRow(){
        return this.state.selectedCustRTNview.items.map(function(object,i){
            return <CustRTNRecordTableRow key={i} records={object} products={this.state.products.find(e => e._id===object.productID)} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        CustRTNtotal=CustRTNtotal+rowsum;
        this.setState({temp: rowsum}); //just refresh page
    }
    modalClose(){
        this.setState({lgShow:false});
        CustRTNtotal=0;
    }
    onChangeStartDate(e){
        this.setState({startDate:e.target.value})
    }
    onChangeEndDate(e){
        this.setState({endDate:e.target.value})
    }
    onSubmit(){
        if(this.state.startDate<this.state.endDate){
            // console.log(new Date(this.state.startDate));
            // console.log(this.state.endDate);
            axios.get(backendde.backendUrl+'viewCustRTN/viewCustRTNrange/'+this.state.startDate+'/'+this.state.endDate)
            .then(response =>{
                this.setState({CustRTNhistory:response.data});
                console.log(this.state.CustRTNhistory);
            })
            .catch(function (error){
                console.log('hi');
                console.log(error);
            });
        }
        else{
            alert("Date range error");
        }
    }

    render() {
        return (
            <div className="container">
                <h2>View Customer Return History</h2>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type='date' required value={this.state.startDate} onChange={this.onChangeStartDate} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>End date</Form.Label>
                        <Form.Control type='date' required value={this.state.endDate} onChange={this.onChangeEndDate} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button onClick={this.onSubmit} variant="primary" type="submit">
                            View Range
                        </Button>
                    </Form.Group>
                    </Row>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr><th>
                                    Customer Return ID
                                </th>
                                <th>
                                    Date and Time
                                </th>
                                
                                <th>Action</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewRecordsTableRow()}
                        </tbody>
                </table>
                
                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={this.modalClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Customer Return details  <br></br>
                        Customer Return id:  {this.state.viewID}<br></br>
                        Date:  {new Date(this.state.selectedCustRTNview.createdAt).toLocaleDateString()+'  '+new Date(this.state.selectedCustRTNview.createdAt).toLocaleTimeString()}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr><th>
                                    Product
                                </th>
                                <th>
                                    Batch No
                                </th>
                                <th>Expire Date</th>
                                <th>Retail Price</th>
                                <th>Quantity</th>
                                <th>Sum (retail)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewCustRTNRecordTableRow()}
                            <tr>
                                <td colSpan='5'><b>Total</b></td>
                                <td align="right"><b>Rs. {CustRTNtotal.toFixed(2)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default viewCustRTNrecords;