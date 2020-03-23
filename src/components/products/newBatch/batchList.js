import React, { Component } from 'react';

class BatchList extends Component {
    
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.batchNo}
                </td>
                <td>
                    {this.props.obj.expDate}
                </td>
                <td>
                    {this.props.obj.wholePrice}
                </td>
                <td>
                    {this.props.obj.retailPrice}
                </td>
                <td>
                    <button className="btn btn-danger">delete</button>
                </td>
            </tr>
        );
    }
}

export default BatchList;