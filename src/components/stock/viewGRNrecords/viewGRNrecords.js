import React, { Component } from 'react';

class viewGRNrecords extends Component {
    
    render() {
        return (
            <div className="container">
                <h2>View GRN History</h2>
                <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
                            <tr><th>
                                    GRN ID
                                </th>
                                <th>
                                    Date and Time
                                </th>
                                
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                </table>

            </div>
        );
    }
}

export default viewGRNrecords;