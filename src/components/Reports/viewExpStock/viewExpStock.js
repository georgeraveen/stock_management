import React, { Component } from 'react';


import axios from 'axios';
import ViewTable from './ViewExpBatch';

const backendde= require('../../../backendde');
class viewExpStock extends Component {

    constructor(props){
        super(props);
        
        
        this.state={
            products:[],
            batches:[],
            temp:0,
            productList:[]
        };
        this.tempproductList=[]
    }

    componentDidMount(){

        axios.get(backendde.backendUrl+'viewProduct/view')

            .then(response =>{
                this.setState({products:response.data},
                    ()=>{
                        this.state.products.map(function(productObj,i){
                            productObj.batches.map(function(batchObj,j){
                                if(batchObj.currentStock>0){
                                    let proItem=batchObj;
                                    proItem.productName=productObj.productName;
                                    this.tempproductList.push(proItem);
                                }
                            }.bind(this));
                        }.bind(this));
                        this.setState({productList:this.tempproductList.sort((a,b)=> new Date(a.expDate)- new Date(b.expDate))});
                        
                    }
                    );
                // console.log(this.tempproductList);
                
            })
        .catch(function (error){
            console.log('hi');
            console.log(error);
        });
    }
    ViewProductTableRow(){
        return this.state.productList.map(function(object,i){
            return <ViewTable obj1={object} key={i}/>;
        });
    }


    render() {
        return (
            <div  className="container">
                <h1>View Expire Stock</h1>
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

export default viewExpStock;