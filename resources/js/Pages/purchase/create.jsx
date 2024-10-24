import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create() {
    const [purchase, setPurchase] = useState({
        name: "",
        total_price: 0,
        measure: "",
    });

    const [products, setProducts] = useState([]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setPurchase((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleAddProduct(e) {
        e.preventDefault();
        if (!purchase.name || !purchase.measure || !purchase.total_price) {
            alert("Please fill all fields");
            return;
        }

        setProducts([...products, { ...purchase }]);
        // Reset the form
        setPurchase({
            name: "",
            total_price: 0,
            measure: "",
        });
    }

    function handleRemoveProduct(index) {
        setProducts(products.filter((_, i) => i !== index));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (products.length === 0) {
            alert("Please add at least one product");
            return;
        }
        router.post("/purchase", { products });
    }

    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Create Purchase</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group mb-4">
                            <label className="block mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={purchase.name}
                                className="form-control"
                                placeholder="Name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block mb-2">Measure</label>
                            <input
                                id="measure"
                                type="text"
                                value={purchase.measure}
                                className="form-control"
                                placeholder="Measure"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block mb-2">Total Price</label>
                            <input
                                id="total_price"
                                type="number"
                                value={purchase.total_price}
                                className="form-control"
                                placeholder="Total Price"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-secondary mb-4"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </button>

                        {products.length > 0 && (
                            <div className="mt-4">
                                <h4 className="mb-2">Added Products:</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Measure</th>
                                                <th>Total Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{product.name}</td>
                                                    <td>{product.measure}</td>
                                                    <td>
                                                        {product.total_price}
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleRemoveProduct(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Submit All Products
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
