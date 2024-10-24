import React from "react";

export default function Index({ products }) {
    return (
        <div className="card card-primary">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="card-title">Product Table</h3>
                    <div className="row">
                        <div className="col-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Product"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table id="example2" className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sell Price</th>
                            <th>Cost Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.sell_price}</td>
                                    <td>{product.cost_price}</td>
                                    <td>{product.quantity}</td>
                                    <td></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
