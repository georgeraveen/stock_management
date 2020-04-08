import React, { Component } from 'react';
import ViewBatch from './ViewBatch';



class ViewTable extends Component {
    
    constructor(props){
        super(props);
        
        this.state={
           
           temp:0
        };
        this.productTotal=0;
        this.stockTotal=0;

    }
    componentDidMount(){
        this.setState({temp: 0});
    }
    ViewBatchTableRow(){
        return this.props.obj.batches.map(function(object1,j){
            this.productTotal=this.productTotal+(object1.wholePrice*object1.currentStock);
            this.stockTotal=this.stockTotal+object1.currentStock;
            return <ViewBatch obj1={object1} key1={j} key={j} />;
        }.bind(this));
        
    }
    
    render() {
        return (
            <React.Fragment>
                
            <tr>
                <td colSpan='5'>
                    {this.props.obj.productName}
                </td>
                <td>
                  {this.stockTotal}
                </td>
                <td>
                  Rs. {this.productTotal}
                </td>
            </tr>
            
            
                {this.ViewBatchTableRow()}
           
            </React.Fragment>
        );
    }
}

export default ViewTable;