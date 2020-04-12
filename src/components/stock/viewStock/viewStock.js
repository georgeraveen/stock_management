import React, { Component } from 'react';


import axios from 'axios';
import ViewTable from './viewTable';

const backendde= require('../../../backendde');
class viewProduct extends Component {

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
                this.setState({products:response.data});
                console.log('abc');
                console.log(this.state.products);
                console.log('abc');
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    ViewProductTableRow(){
        return this.state.products.map(function(object,i){
            return <ViewTable obj={object} key={i}/>;
        });
    }


    render() {
        return (
            <div  className="container">
                <h1>View Stock</h1>
                <table className="table table-striped" style={{marginTop:20}}>
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
                                <th>Stock</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.ViewProductTableRow()}
                        </tbody>
                    </table>
 
            </div>
        );
    }
}

export default viewProduct;