import { useState } from "react";
import { router } from '@inertiajs/react';


export default function Create({ products, user_id }) {
    const [invoice, setInvoice] = useState({
        discount: "",
        user_id: user_id || "",  // Use the passed user_id prop
        products: [],
    });

    const [product, setProduct] = useState({
        product_id: "",
        quantity: 1,
        sell_price: 0,
        discount: 0,
    });

    const handleInvoiceChange = (e) => {
        const { id, value } = e.target;
        setInvoice((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleProductChange = (e) => {
        const { id, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [id]: value,
        }));
        if (id === "product_id") {
            const selectedProduct = products.find(p => p.id === parseInt(value));
            if (selectedProduct) {
                setProduct((prev) => ({
                    ...prev,
                    sell_price: selectedProduct.sell_price, // Set the selected product's price
                }));
            }
        }
    };

    const addProduct = () => {
        if (product.product_id && product.quantity > 0) {
            // Find the product details from the products list to include sell_price
            const selectedProduct = products.find(p => p.id === parseInt(product.product_id));

            if (selectedProduct) {
                // Add product to the invoice with sell_price
                setInvoice((prev) => ({
                    ...prev,
                    products: [
                        ...prev.products,
                        {
                            ...product,
                            sell_price: selectedProduct.sell_price, // Add sell_price
                        },
                    ],
                }));
            }
            setProduct({ product_id: "", quantity: 1, discount: 0 });
        } else {
            alert("Please select a product and enter valid details.");
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const totalPrice = invoice.products.reduce((total, product) => {
            // Assuming `sell_price` is included for each product
            const productTotal = product.quantity * (product.sell_price || 0);
            const discountAmount = productTotal * (product.discount / 100);
            return total + (productTotal - discountAmount);
        }, 0);

        // Prepare the final invoice data
        const invoiceData = {
            total_price: totalPrice.toFixed(2), // Ensure total_price is formatted to two decimal places
            discount: invoice.discount || 0, // Invoice-level discount
            user_id: invoice.user_id, // User ID
            products: invoice.products.map(product => ({
                product_id: product.product_id,
                quantity: product.quantity,
                discount: product.discount,
                sell_price: product.sell_price // Ensure sell_price is included in the submitted data
            }))
        };

        // Here, you can submit the data via Inertia
        router.post("/invoice", invoiceData);
    };


    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Create Invoice</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label>User ID</label>
                            <input
                                id="user_id"
                                type="text"
                                value={invoice.user_id}
                                className="form-control"
                                placeholder="User ID"
                                onChange={handleInvoiceChange}
                                required
                            />
                        </div>
                        <hr />
                        <h5>Add Products</h5>
                        <div className="form-group">
                            <label>Product</label>
                            <select
                                id="product_id"
                                value={product.product_id}
                                className="form-control"
                                onChange={handleProductChange}
                                required
                            >
                                <option value="">Select a product</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} - ${p.sell_price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={product.quantity}
                                className="form-control"
                                placeholder="Quantity"
                                min="1"
                                onChange={handleProductChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Discount (%)</label>
                            <input
                                id="discount"
                                type="number"
                                value={product.discount}
                                className="form-control"
                                placeholder="Product Discount"
                                min="0"
                                max="100"
                                onChange={handleProductChange}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mb-3"
                            onClick={addProduct}
                        >
                            Add Product
                        </button>
                        <ul>
                            {invoice.products.map((p, index) => (
                                <li key={index}>
                                    Product ID: {p.product_id}, Quantity: {p.quantity}, Discount: {p.discount}%
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className="form-group">
                            <label>Total Invoice Discount (Optional)</label>
                            <input
                                id="discount"
                                type="number"
                                value={invoice.discount}
                                className="form-control"
                                placeholder="Total Invoice Discount"
                                onChange={handleInvoiceChange}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
