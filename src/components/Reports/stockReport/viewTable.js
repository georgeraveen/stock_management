import React, { Component } from 'react';
import ViewBatch from './ViewBatch';



class ViewTable extends Component {
    
    constructor(props){
        super(props);
        this.productTotal=0;
        this.stockTotal=0;

        this.state={
           
           temp:0
        };
        
    }
    componentDidMount(){
        this.setState({temp: 0});
        this.props.callbackSum(this.productTotal);
    }
    ViewBatchTableRow(){
        this.productTotal=0;
        this.stockTotal=0;
        return this.props.obj.batches.map(function(object1,j){
            if(object1.currentStock>0){
                this.productTotal=this.productTotal+(object1.wholePrice*object1.currentStock);
                this.stockTotal=this.stockTotal+object1.currentStock;
                return <ViewBatch obj1={object1} key1={j} key={j} />;
            }
        }.bind(this));
        
    }
    
    render() {
        return (
            <React.Fragment>
          
            <tr className="table-primary">
                <th colSpan='5'>
                    {this.props.obj.productName}
                </th>
                <td>
                  {this.stockTotal}
                </td>
                <td align="right">
                  Rs. {this.productTotal}
                </td>
            </tr>
            
                {this.ViewBatchTableRow()}
           
            </React.Fragment>
        );
    }
}

export default ViewTable;