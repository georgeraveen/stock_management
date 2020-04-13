import React, { Component } from 'react';
import axios from 'axios';
import GRNhistoyRow from './GRNhistoyRow';
import {Modal} from 'react-bootstrap';
import GRNRecordTableRow from './GRNRecordTableRow';

const backendde= require('../../../backendde');
var GRNtotal=0;
class viewGRNrecords extends Component {

    constructor(props){
        super(props);
        this.callbackClickView=this.callbackClickView.bind(this);
        this.ViewGRNRecordTableRow=this.ViewGRNRecordTableRow.bind(this);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        this.modalClose=this.modalClose.bind(this);

        this.state={
            GRNhistory:[],
            products:[],
            lgShow:false,
            viewID:'',
            temp:0,
            selectedGRNview:{
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
        axios.get(backendde.backendUrl+'viewGRN/viewGRN')
            .then(response =>{
                this.setState({GRNhistory:response.data});
                console.log(this.state.GRNhistory);
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
        return this.state.GRNhistory.map(function(object,i){
            return <GRNhistoyRow key={i} obj={object} clickView={this.callbackClickView}/>;
        }.bind(this));
    }
    callbackClickView(ViewMessage){
        
        this.setState({
            viewID:ViewMessage,
            selectedGRNview:this.state.GRNhistory.find(e => e._id===ViewMessage),
        },()=>{this.createDate= new Date(this.state.selectedGRNview.createdAt);
                this.setState({
                    onlyDateCreate:this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()+'  '+this.createDate.getHours()+':'+this.createDate.getMinutes(),
                    lgShow:true});
        })
            
    }
    ViewGRNRecordTableRow(){
        return this.state.selectedGRNview.items.map(function(object,i){
            return <GRNRecordTableRow key={i} records={object} products={this.state.products.find(e => e._id===object.productID)} callbackSum = {this.callbackRowSum} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        GRNtotal=GRNtotal+rowsum;
        this.setState({temp: rowsum}); //just refresh page
    }
    modalClose(){
        this.setState({lgShow:false});
        GRNtotal=0;
    }
    render() {
        return (
            <div className="container">
                <h2>View GRN History</h2>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr><th>
                                    GRN ID
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
                        GRN details  <br></br>
                        GRN id:  {this.state.viewID}<br></br>
                        Date:  {this.state.onlyDateCreate}
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
                                <th>Wholesale Price</th>
                                <th>Free Quantity</th>
                                <th>Quantity</th>
                                <th>Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewGRNRecordTableRow()}
                            <tr>
                                <td colSpan='6'><b>Total</b></td>
                                <td align="right"><b>Rs. {GRNtotal}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default viewGRNrecords;