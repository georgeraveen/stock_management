import React, { Component } from 'react';

import axios from 'axios';
import ViewTable from './viewTable';

class viewProduct extends Component {

    constructor(props){
        super(props);
        
        
        this.state={
            products:[],
            batches:[],
        };

    }

    componentDidMount(){
        axios.get('http://localhost:4000/viewProduct/view')
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
                <h1>View all products</h1>
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
                                <th colSpan="2">Action</th>
                                
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