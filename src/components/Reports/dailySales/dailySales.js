import React, { Component } from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import SalesList from './SalesList';




import axios from 'axios';
const backendde= require('../../../backendde');
var total=0;
class dailySales extends Component {
    constructor(props){
        super(props);
        this.onChangeStartDate=this.onChangeStartDate.bind(this);
        this.onChangeEndDate=this.onChangeEndDate.bind(this);
        // this.onSubmit=this.onSubmit.bind(this);
        var today=new Date()
        this.state={
            products:[],
            movement:[],
            startDate: today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+('0' + (today.getDate())).slice(-2),
            endDate: today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+('0' + (today.getDate())).slice(-2),
        };
    }

    componentDidMount(){

        axios.get(backendde.backendUrl+'newProduct/view')

            .then(response =>{
                this.setState({products:response.data});
                axios.get(backendde.backendUrl+'stockMove/viewMoveAll').then(
                    res=>{this.setState({
                        movement:res.data.history
                    });}
                )
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
        
    }
    
    displayMoveList(){
        
        return this.state.movement.map(function(object,i){
            
            var historys=object.movement.filter(element=> ((element.moveType==="Invoice" || (element.moveType==="Customer Return")) && (element.recordDate > new Date(this.state.startDate).toISOString() && element.recordDate < new Date(this.state.endDate).toISOString())));
            if (historys.length>0){
                // console.log(historys);
                const productDetail=this.state.products.find(e=> e._id===object.productID);
                const batchDetail=productDetail.batches.find(e=> e._id===object.batchID);
                var qtySum=0;
                historys.map(function(obj,i){
                    if(obj.moveType==="Customer Return"){
                        qtySum-=obj.quantity;
                    }
                    else{
                        qtySum+=obj.quantity;
                    }
                });
                total+=(qtySum*batchDetail.retailPrice);
                return <SalesList  key={i} products={productDetail} batch={batchDetail} sum={qtySum}/>;
            }
            
            
        }.bind(this));
    }
    onChangeStartDate(e){
        this.setState({startDate:e.target.value})

    }
    onChangeEndDate(e){
        this.setState({endDate:e.target.value})
    }
    // onSubmit(){

    // }
    render() {
        return (
            <div className="container">
                <h1>Sales Report</h1><br></br>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type='date' required value={this.state.startDate} onChange={this.onChangeStartDate} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>End date</Form.Label>
                        <Form.Control type='date' required value={this.state.endDate} onChange={this.onChangeEndDate} />
                    </Form.Group>
                    {/* <Form.Group as={Col}>
                        <Button onClick={this.onSubmit} variant="primary" type="submit">
                            View Range
                        </Button>
                    </Form.Group> */}
                    </Row>
                  
                      
                <div>
                    <table className="table table-striped table-bordered" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr>
                                
                                <th>
                                    Product
                                </th>
                                <th>
                                    Batch No
                                </th>
                                <th>
                                    Sale Quantity
                                </th>
                                <th>
                                    Retail Price
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayMoveList()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4">Total</th>
                                <th  align="right">Rs. {total}</th>
                            </tr>
                            
                        </tfoot>
                    </table>
                </div>
                <br></br>
                
                <br></br>
                
            </div>
        );
    }
}

export default dailySales;