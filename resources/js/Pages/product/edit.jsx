import { useState } from "react";
import { router } from "@inertiajs/react";
export default function Edit({ product }) {
    const [productToEdit, setProductToEdit] = useState({
        name: product.name,
        sell_price: product.sell_price,
        cost_price: product.cost_price,
        quantity: product.quantity,
    });
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setProductToEdit((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        router.put(`/product/${product.id}`, productToEdit);
    }
    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Create Product</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                id="name"
                                type="text"
                                value={productToEdit.name}
                                className="form-control"
                                placeholder="Name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Sell Price</label>
                            <input
                                id="sell_price"
                                type="text"
                                value={productToEdit.sell_price}
                                className="form-control"
                                placeholder="Sell Price"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Cost Price</label>
                            <input
                                id="cost_price"
                                type="text"
                                value={productToEdit.cost_price}
                                className="form-control"
                                placeholder="Cost Price"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                id="quantity"
                                type="text"
                                value={productToEdit.quantity}
                                className="form-control"
                                placeholder="Quantity"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
