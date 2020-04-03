import React, { Component } from 'react';

class CustRTNhistoyRow extends Component {
    constructor(props){
        super(props);
        this.state={
           
        };
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
                    {this.props.obj.createdAt}
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

export default CustRTNhistoyRow;