import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create() {
    const [product, setProduct] = useState({
        name: "",
        sell_price: 0,
        cost_price: 0,
        quantity: 0,
    });
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setProduct((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/product", product);
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
                                value={product.name}
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
                                value={product.sell_price}
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
                                value={product.cost_price}
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
                                value={product.quantity}
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
