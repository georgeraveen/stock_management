import React, { Component } from 'react';
import ProductListDropdown from './productListDropdown';
import BatchList from './batchList';
import NewBatchform from './newBatchform';



import axios from 'axios';
const backendde= require('./../../../backendde');
class newBatch extends Component {
    constructor(props){
        super(props);
        this.onSelectProduct=this.onSelectProduct.bind(this);
        this.updateProducts=this.updateProducts.bind(this);
        this.state={
            products:[],
            batches:[],
            selectedProduct:''
        };
    }

    componentDidMount(){

        axios.get(backendde.backendUrl+'newProduct/view')

            .then(response =>{
                this.setState({products:response.data});
                console.log(this.state.products);
                
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    dropdownProduct(){
        return this.state.products.map(function(object,i){
            return <ProductListDropdown obj={object} key={i}/>;
        });
    }
    onSelectProduct(e){
        this.setState({
            selectedProduct:e.target.value
        });
    }
    displayBatchList(){
        var a=this.state.selectedProduct;
        return this.state.products.map(function(object,i){
            if(a==(object._id)){
                return object.batches.map(function(object1,j){
                    return <BatchList selProduct={object['_id']} obj={object1} key={j} newProducts={this.updateProducts}/>;
                }.bind(this));
            };
        }.bind(this));
    }
    displayNewBatchForm(){
        if(this.state.selectedProduct!=''){
            return<NewBatchform selProduct={this.state.selectedProduct} newProducts={this.updateProducts}/>
        };
    }
    updateProducts(newProducts){
        this.setState({products:newProducts});
    }
    render() {
        return (
            <div className="container">
                <h1>Add new batch to product</h1><br></br>
               
                <div className="form-group">
                <label htmlFor="sel1">Select product:</label>
                <select onChange={this.onSelectProduct} className="form-control" id="sel1">
                    <option value=''>select</option>
                    {this.dropdownProduct()};
                </select>
                <br></br>
                
                </div>    
                      
                <div>
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr>
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
                            {this.displayBatchList()}
                        </tbody>
                    </table>
                </div>
                <br></br>
                
                <br></br>
                <div>
                    {this.displayNewBatchForm()}
                </div>
            </div>
        );
    }
}

export default newBatch;