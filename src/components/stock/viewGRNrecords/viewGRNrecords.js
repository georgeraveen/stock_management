import React, { Component } from 'react';
import axios from 'axios';
import GRNhistoyRow from './GRNhistoyRow';
import {Modal,Button} from 'react-bootstrap'

var selectedGRNview='';

const backendde= require('../../../backendde');
class viewGRNrecords extends Component {
    
    constructor(props){
        super(props);
        this.callbackClickView=this.callbackClickView.bind(this);
        
        this.state={
            GRNhistory:[],
            products:[],
            lgShow:false,
            viewID:''
        };
        

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
            return <GRNhistoyRow obj={object}  key={i} clickView={this.callbackClickView}/>;
        }.bind(this));
    }
    callbackClickView(ViewMessage){
        
        this.setState({
            viewID:ViewMessage})
        console.log(this.state.GRNhistory);
        console.log(this.state.products);
        // var a=this.state.products.find(e => e._id === '5e8323383cddb62a20322969')
        var a=this.state.GRNhistory.find(e => e._id===this.state.viewID);
        console.log(selectedGRNview);
        console.log(a);

        this.setState({
            lgShow:true})
    }
    render() {
        return (
            <div className="container">
                <h2>View GRN History</h2>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
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
                <Button onClick={() => this.setState({lgShow:true})}>Large modal</Button>
                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={() => this.setState({lgShow:false})}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        GRN details  <br></br>
                        GRN id:{this.state.viewID}<br></br>
                        Date:{selectedGRNview}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default viewGRNrecords;