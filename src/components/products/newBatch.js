import React, { Component } from 'react';
import ProductListDropdown from './productListDropdown';


import axios from 'axios';

class newBatch extends Component {
    constructor(props){
        super(props);
        this.state={products:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/newProduct/view')
            .then(response =>{
                this.setState({products:response.data});
                console.log(this.state.products);
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        })
        
    }
    dropdownProduct(){
        return this.state.products.map(function(object,i){
            return <ProductListDropdown obj={object} key={i}/>;
        });
    }
    
    render() {
        return (
            <div className="container">
                <h1>Add new batch to product</h1><br></br>             
                <div className="form-group">
                <label htmlFor="sel1">Select product:</label>
                <select className="form-control" id="sel1">
                    {this.dropdownProduct()};
                </select>
                </div>    
                      
            </div>
        );
    }
}

export default newBatch;