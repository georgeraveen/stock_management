import React, { Component } from 'react';
import ViewBatch from './ViewBatch';

class ViewTable extends Component {
    
    ViewBatchTableRow(){
        return this.props.obj.batches.map(function(object1,j){
            return <ViewBatch obj1={object1} key1={j}/>;
        });
    }

    render() {
        return (
            <React.Fragment>
            <tr>
                <td colSpan='5'>
                    {this.props.obj.productName}
                </td>
                <td>
                  
                </td>
            </tr>
            
            
                {this.ViewBatchTableRow()}
           
            </React.Fragment>
        );
    }
}

export default ViewTable;