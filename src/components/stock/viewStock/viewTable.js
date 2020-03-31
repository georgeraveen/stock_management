import React, { Component } from 'react';
import ViewBatch from './ViewBatch';


import axios from 'axios';
const backendde= require('./../../../backendde');
class ViewTable extends Component {
    constructor(props) {
        super(props);
    }
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