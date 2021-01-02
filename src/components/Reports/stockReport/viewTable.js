import React, { Component } from 'react';
import ViewBatch from './ViewBatch';



class ViewTable extends Component {

    constructor(props) {
        super(props);
        this.productTotal = 0;
        this.stockTotal = 0;

        this.state = {

            temp: 0
        };

    }
    componentDidMount() {
        this.setState({ temp: 0 });
        this.props.callbackSum(this.productTotal);
    }
    ViewBatchTableRow() {
        this.productTotal = 0;
        this.stockTotal = 0;
        return this.props.obj.batches.map(function (object1, j) {
            if (object1.currentStock > 0) {
                this.productTotal = this.productTotal + (object1.retailPrice * object1.currentStock);
                this.stockTotal = this.stockTotal + object1.currentStock;
                return <ViewBatch obj1={object1} key1={j} key={j} />;
            }
        }.bind(this));

    }
    viewProduct() {
        return (
            <>
                <tr className="table-primary">
                    <th colSpan='5'>
                        {this.props.obj.productName}
                    </th>
                    <td style={{ backgroundColor: this.stockTotal <= this.props.obj.stockMaintain ? "#FF6161" : "#9FCDFF" }}>
                        {this.stockTotal}
                    </td>
                    <td align="right">
                        Rs. {this.productTotal.toFixed(2)}
                    </td>
                </tr>
                {this.ViewBatchTableRow()}
            </>
        );
    }
    render() {
        return (
            <React.Fragment>

                {this.props.viewPurchase ? this.stockTotal <= this.props.obj.stockMaintain ? this.viewProduct() : <></> : this.viewProduct()}




            </React.Fragment>
        );
    }
}

export default ViewTable;