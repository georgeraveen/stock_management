import React, { Component } from 'react';
import axios from 'axios';
import RTNhistoyRow from './RTNhistoyRow';
import {Modal} from 'react-bootstrap';
import RTNRecordTableRow from './RTNRecordTableRow';

const backendde= require('../../../backendde');
var RTNtotal=0;
class viewRTNrecords extends Component {

    constructor(props){
        super(props);
        this.callbackClickView=this.callbackClickView.bind(this);
        this.ViewRTNRecordTableRow=this.ViewRTNRecordTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.modalClose=this.modalClose.bind(this);

        this.state={
            RTNhistory:[],
            products:[],
            lgShow:false,
            viewID:'',
            temp:0,
            selectedRTNview:{
                createdAt:'',
                items:[{
                    productID:'',
                }]
            },
            onlyDateCreate:''
        };
        this.createDate= '';
    }
    componentDidMount(){
        axios.get(backendde.backendUrl+'viewRTN/viewRTN')
            .then(response =>{
                this.setState({RTNhistory:response.data});
                console.log(this.state.RTNhistory);
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
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
        return this.state.RTNhistory.map(function(object,i){
            return <RTNhistoyRow key={i} obj={object} clickView={this.callbackClickView}/>;
        }.bind(this));
    }
    callbackClickView(ViewMessage){
        
        this.setState({
            viewID:ViewMessage,
            selectedRTNview:this.state.RTNhistory.find(e => e._id===ViewMessage)
        },()=>{this.createDate= new Date(this.state.selectedRTNview.createdAt);
            this.setState({
                onlyDateCreate:this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()+'  '+this.createDate.getHours()+':'+this.createDate.getMinutes(),
                lgShow:true});
    })
    }
    ViewRTNRecordTableRow(){
        return this.state.selectedRTNview.items.map(function(object,i){
            return <RTNRecordTableRow key={i} records={object} products={this.state.products.find(e => e._id===object.productID)} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        RTNtotal=RTNtotal+rowsum;
        this.setState({temp: rowsum}); //just refresh page
    }
    modalClose(){
        this.setState({lgShow:false});
        RTNtotal=0;
    }
    render() {
        return (
            <div className="container">
                <h2>View Return History</h2>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr><th>
                                    Return ID
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
                        Return details  <br></br>
                        Return id:  {this.state.viewID}<br></br>
                        Date:  {this.state.onlyDateCreate}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
                            <tr><th>
                                    Product
                                </th>
                                <th>
                                    Batch No
                                </th>
                                <th>Expire Date</th>
                                <th>Wholesale Price</th>
                                <th>Free Quantity</th>
                                <th>Quantity</th>
                                <th>Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewRTNRecordTableRow()}
                            <tr>
                                <td colSpan='6'><b>Total</b></td>
                                <td align="right"><b>Rs. {RTNtotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default viewRTNrecords;