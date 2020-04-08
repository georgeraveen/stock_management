import React, { Component } from 'react';


import axios from 'axios';
import ViewTable from './viewTable';

const backendde= require('../../../backendde');
class stockReport extends Component {

    constructor(props){
        super(props);
        this.callbackRowSum=this.callbackRowSum.bind(this);
        
        this.state={
            products:[],
            batches:[],
        };
        this.grandtotal=0
    }

    componentDidMount(){

        axios.get(backendde.backendUrl+'viewProduct/view')

            .then(response =>{
                console.log('abc');
                this.setState({products:response.data});
                
                console.log(this.state.products);
                console.log('abc');
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    viewProductTableRow(){
        return this.state.products.map(function(object,i){
            return <ViewTable obj={object} key={i} callbackSum={this.callbackRowSum}/>;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        this.grandtotal=this.grandtotal+rowsum;
        this.setState({temp: 0}); //just to refresh page
    }

    render() {
        return (
            <div  className="container">
                <h1>Stock Balence Report</h1>
                <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
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
                                <th>Stock</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.viewProductTableRow()}
                            <tr>
                                <td colSpan='6'>Grand Total</td>
                                <td align="right">Rs. {this.grandtotal}</td>
                            </tr>
                        </tbody>
                    </table>
 
            </div>
        );
    }
}

export default stockReport;