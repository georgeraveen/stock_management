import React, { Component } from 'react';

class BatchList extends Component {
    constructor(props){
        super(props);
        this.createDate= new Date(this.props.obj.recordDate);
    }
    render() {
        return (
            <tr>
                
                <td>{this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()+'  '+this.createDate.getHours()+':'+this.createDate.getMinutes()}</td>
               
                <td>
                    {this.props.obj.moveType}
                </td>
                <td>
                    {this.props.obj.moveID}
                </td>
                <td>
                    {this.props.obj.preStock}
                </td>
                <td>
                    {this.props.obj.quantity}
                </td>
            </tr>
        );
    }
}

export default BatchList;