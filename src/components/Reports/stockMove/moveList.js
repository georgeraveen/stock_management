import React, { Component } from 'react';

class BatchList extends Component {
    render() {
        return (
            <tr>
                
                
                <td>{new Date(this.props.obj.recordDate).toLocaleDateString()+"  "+new Date(this.props.obj.recordDate).toLocaleTimeString()}</td>
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