import React, { Component } from 'react';

class GRNhistoyRow extends Component {
    constructor(props){
        super(props);
        this.viewButton=this.viewButton.bind(this);
    }
    viewButton(){
        this.props.clickView(this.props.obj._id);
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {new Date(this.props.obj.createdAt).toLocaleDateString() + '  ' + new Date(this.props.obj.createdAt).toLocaleTimeString()}
                </td>
                <td>
                <button onClick={this.viewButton}  className="btn btn-success">View</button>
                </td>
                <td>
                    {this.props.obj.remarks}
                </td>
            </tr>
        );
    }
}

export default GRNhistoyRow;