import React, { Component } from 'react';


import axios from 'axios';
import ViewTable from './viewTable';

const backendde= require('../../../backendde');
class stockReport extends Component {

    constructor(props){
        super(props);
        
        
        this.state={
            products:[],
            batches:[],
        };

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
            return <ViewTable obj={object} key={i}/>;
        });
    }


    render() {
        return (
            <div  className="container">
                <h1>Stock Balence Report</h1>
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
                                <th>Stock</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.viewProductTableRow()}
                        </tbody>
                    </table>
 
            </div>
        );
    }
}

export default stockReport;