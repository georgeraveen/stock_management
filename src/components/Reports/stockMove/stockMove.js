import React, { Component } from 'react';

import MoveList from './moveList';




import axios from 'axios';
const backendde= require('../../../backendde');
class stockMove extends Component {
    constructor(props){
        super(props);
        this.onSelectProduct=this.onSelectProduct.bind(this);
        this.onSelectBatch=this.onSelectBatch.bind(this);
        
        this.state={
            products:[],
            batches:[],
            selectedProduct:'',
            selectedBatch:'',
            movement:[]
        };
    }

    componentDidMount(){

        axios.get(backendde.backendUrl+'newProduct/view')

            .then(response =>{
                this.setState({products:response.data});
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    dropdownProduct(){
        return this.state.products.map(function(object,i){
            return (
                <option key={i} value={object._id}>{object.productName}</option>
            );
        });
    }
    dropdownBatch(){
        return this.state.batches.map(function(object,i){
            return (
                <option key={i} value={object._id}>{object.batchNo}</option>
            );
        });
    }
    onSelectProduct(e){
        if(e.target.value!==''){
            this.setState({
                selectedProduct:e.target.value,
                batches:this.state.products.find(f=> f._id===e.target.value).batches,
                movement:[]
            });
        }
    }
    onSelectBatch(e){
        if(e.target.value!==''){
            this.setState({
                selectedBatch:e.target.value,
            });
            console.log(e.target.value);
            axios.get(backendde.backendUrl+'stockMove/viewMove/'+e.target.value).then(
                res=>{this.setState({
                    movement:res.data.movement
                });}
            )
        }
    }
    displayMoveList(){
        // var a=this.state.selectedProduct;
        return this.state.movement.map(function(object,i){
            
            return <MoveList  obj={object} key={i} />;
            
        });
    }
    
    render() {
        return (
            <div className="container">
                <h1>View stock Movement</h1><br></br>
               
                <div className="form-group">
                <label htmlFor="sel1">Select product:</label>
                <select onChange={this.onSelectProduct} className="form-control" id="sel1">
                    <option value=''>select</option>
                    {this.dropdownProduct()};
                </select>
                <br></br>
                <label >Select batch:</label>
                <select onChange={this.onSelectBatch} value={this.state.selectedBatch} className="form-control" id="sel1">
                    <option value=''>select</option>
                    {this.dropdownBatch()};
                </select>
                <br></br>
                </div>    
                      
                <div>
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead className="thead-dark">
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Description ID
                                </th>
                                <th>
                                    Pre Stock
                                </th>
                                <th>
                                    Quantity
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayMoveList()}
                        </tbody>
                    </table>
                </div>
                <br></br>
                
                <br></br>
                
            </div>
        );
    }
}

export default stockMove;