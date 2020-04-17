import React, { Component } from 'react';
import axios from 'axios';
import INVChistoyRow from './INVChistoyRow';
import {Modal, Form, Row, Button, Col} from 'react-bootstrap';
import INVCRecordTableRow from './INVCRecordTableRow';

const backendde= require('../../../backendde');
var INVCtotal=0;
var NetTotal=0;
class viewINVCrecords extends Component {

    constructor(props){
        super(props);
        this.callbackClickView=this.callbackClickView.bind(this);
        this.ViewINVCRecordTableRow=this.ViewINVCRecordTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.onChangeStartDate=this.onChangeStartDate.bind(this);
        this.onChangeEndDate=this.onChangeEndDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
        this.state={
            INVChistory:[],
            products:[],
            lgShow:false,
            viewID:'',
            temp:0,
            selectedINVCview:{
                createdAt:'',
                discount:0,
                items:[{
                    productID:'',
                }]
            },
            startDate:'',
            endDate:''
        };
        
    }
    componentDidMount(){
        // axios.get(backendde.backendUrl+'viewINVC/viewINVC')
        //     .then(response =>{
        //         this.setState({INVChistory:response.data});
        //         console.log(this.state.INVChistory);
        //     })
        // .catch(function (error){
        //     console.log('hi');
        //     console.log(error);
        // });
        axios.get(backendde.backendUrl+'viewProduct/view')

            .then(response =>{
                this.setState({products:response.data});
            })
        .catch(function (error){
            console.log(error);
        });
    }
    ViewRecordsTableRow(){
        return this.state.INVChistory.map(function(object,i){
            return <INVChistoyRow key={i} obj={object} clickView={this.callbackClickView}/>;
        }.bind(this));
    }
    callbackClickView(ViewMessage){
        
        this.setState({
            viewID:ViewMessage,
            selectedINVCview:this.state.INVChistory.find(e => e._id===ViewMessage),
            lgShow:true
        })
    }
    ViewINVCRecordTableRow(){
        return this.state.selectedINVCview.items.map(function(object,i){
            return <INVCRecordTableRow key={i} records={object} products={this.state.products.find(e => e._id===object.productID)} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        INVCtotal=INVCtotal+rowsum;
        NetTotal=INVCtotal;
        NetTotal=INVCtotal*(100-this.state.selectedINVCview.discount)/100;
        this.setState({temp: rowsum}); //just refresh page
    }
    modalClose(){
        this.setState({lgShow:false});
        INVCtotal=0;
        NetTotal=0;
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
            axios.get(backendde.backendUrl+'viewINVC/viewINVCrange/'+this.state.startDate+'/'+this.state.endDate)
            .then(response =>{
                this.setState({INVChistory:response.data});
                console.log(this.state.INVChistory);
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
                <h2>View Invoice History</h2>
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
                                    Invoice ID
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
                        Invoice details  <br></br>
                        Invoice id:  {this.state.viewID}<br></br>
                        Date:  {new Date(this.state.selectedINVCview.createdAt).toLocaleDateString()+'  '+new Date(this.state.selectedINVCview.createdAt).toLocaleTimeString()}
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
                                <th>Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewINVCRecordTableRow()}
                            <tr>
                                <td colSpan='5'><b>Total</b></td>
                                <td align="right"><b>Rs. {INVCtotal.toFixed(2)}</b></td>
                            </tr>
                            <tr>
                                <td colSpan='5'><b>Discount</b></td>
                                <td align="right"><b>{this.state.selectedINVCview.discount} %</b></td>
                            </tr>
                            <tr>
                                <td colSpan='5'><b>Grand Total</b></td>
                                <td align="right"><b>Rs. {NetTotal.toFixed(2)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default viewINVCrecords;