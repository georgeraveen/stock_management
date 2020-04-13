import React, { Component } from 'react';

class CustRTNhistoyRow extends Component {
    constructor(props){
        super(props);
        this.state={
           
        };
        this.createDate= new Date(this.props.obj.createdAt);
        this.onlyDateCreate=this.createDate.getFullYear()+'-'+(this.createDate.getMonth()+1)+'-'+this.createDate.getDate()+'  '+this.createDate.getHours()+':'+this.createDate.getMinutes()
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
                    {this.onlyDateCreate}
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