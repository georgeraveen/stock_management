import React, { Component } from 'react';
import { ToggleButton } from 'react-bootstrap';


import axios from 'axios';
import ViewTable from './viewTable';

const backendde = require('../../../backendde');
class stockReport extends Component {

    constructor(props) {
        super(props);
        this.callbackRowSum = this.callbackRowSum.bind(this);
        this.filterTable = this.filterTable.bind(this);

        this.state = {
            viewPurchase: false,
            products: [],
            batches: [],
            filterProducts: [],
            temp: 0
        };
        this.grandtotal = 0
    }

    componentDidMount() {

        axios.get(backendde.backendUrl + 'viewProduct/view')

            .then(response => {
                this.setState({
                    products: response.data,
                    filterProducts: response.data
                });

                // console.log(this.state.products);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    viewProductTableRow() {
        return this.state.filterProducts.map(function (object, i) {
            return <ViewTable obj={object} key={i} callbackSum={this.callbackRowSum} viewPurchase={this.state.viewPurchase} />;
        }.bind(this));
    }
    callbackRowSum = (rowsum) => {
        this.grandtotal = this.grandtotal + rowsum;
        this.setState({ temp: 0 }); //just to refresh page
    }
    filterTable(e) {
        this.grandtotal = 0;
        this.setState({
            filterProducts: this.state.products.filter(x => x.productName.includes(e.target.value))
        })
        this.setState({
            temp: 1
        })

    }
    render() {
        return (
            <div className="container">
                <h1>Stock Balence Report</h1>
                <br></br>
                <br></br>
                <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    checked={this.state.viewPurchase}
                    value="1"
                    onChange={(e) => this.setState({ viewPurchase: e.currentTarget.checked })}
                >
                    View products to be purchased
                </ToggleButton>
                <br></br>
                <br></br>
                <input type="text" id="filterInput" onChange={this.filterTable} placeholder="Search for Product names.."></input>
                <br></br>

                <br></br>
                <table className="table table-striped table-bordered table-hover" style={{ marginTop: 20 }}>
                    <thead className="thead-dark">
                        <tr><th>
                            Product Name
                                </th>
                            <th>
                                Batch No
                                </th>
                            <th>
                                Expire Date
                                </th>
                            <th>
                                Wholesale Price
                                </th>
                            <th>
                                Retail Price
                                </th>
                            <th>Stock</th>
                            <th>Total (Retail Price)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.viewProductTableRow()}
                        {this.state.viewPurchase ? <></> :
                            <tr className="table-success">
                                <td colSpan='6'>Grand Total</td>
                                <td align="right">Rs. {this.grandtotal.toFixed(2)}</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default stockReport;