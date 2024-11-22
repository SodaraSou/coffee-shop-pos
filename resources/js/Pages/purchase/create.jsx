import { useState } from "react";
import { router } from '@inertiajs/react';

export default function CreatePurchase({ user_id }) {
    const [purchase, setPurchase] = useState({
        total_pay: 0, // Initialize total_pay to 0
        spend_money: "",
        user_id: user_id || "",  // Use the passed user_id prop
        ingredients: [],
    });

    const [ingredient, setIngredient] = useState({
        name: "",
        cost_price: 0,
        quantity: 1
    });

    // Handle changes in the purchase fields (total_pay, spend_money)
    const handlePurchaseChange = (e) => {
        const { id, value } = e.target;
        setPurchase((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Handle changes in the ingredient fields (name, cost_price, etc.)
    const handleIngredientChange = (e) => {
        const { id, value } = e.target;
        setIngredient((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Add a new ingredient to the purchase
    const addIngredient = () => {
        if (ingredient.name && ingredient.cost_price > 0 && ingredient.quantity > 0) {
            setPurchase((prev) => {
                const updatedIngredients = [...prev.ingredients, ingredient];
                const totalPay = updatedIngredients.reduce((total, ingredient) => {
                    return total + ingredient.cost_price * ingredient.quantity;
                }, 0);

                return {
                    ...prev,
                    ingredients: updatedIngredients,
                    total_pay: totalPay, // Update total pay
                };
            });
            // Reset ingredient form after adding
            setIngredient({ name: "", cost_price: 0, quantity: 1 });
        } else {
            alert("Please fill out all ingredient details.");
        }
    };

    // Handle form submission for creating the purchase and associated ingredients
    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseData = {
            total_pay: purchase.total_pay, // Use the calculated total
            spend_money: purchase.spend_money,
            user_id: purchase.user_id,
            ingredients: purchase.ingredients.map((ingredient) => ({
                name: ingredient.name,
                cost_price: ingredient.cost_price,
                quantity: ingredient.quantity,
            })),
        };

        // Submit data via Inertia
        router.post("/purchase", purchaseData);
    };

    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Create Purchase</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        {/* Purchase fields */}
                        <div className="form-group">
                            <label>Spend Money</label>
                            <input
                                id="spend_money"
                                type="number"
                                value={purchase.spend_money}
                                className="form-control"
                                placeholder="Spend Money"
                                onChange={handlePurchaseChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Total Pay</label>
                            <input
                                id="total_pay"
                                type="number"
                                value={purchase.total_pay}
                                className="form-control"
                                placeholder="Total Pay"
                                readOnly
                            />
                        </div>
                        <hr />
                        <h5>Add Ingredients</h5>
                        {/* Ingredient fields */}
                        <div className="form-group">
                            <label>Ingredient Name</label>
                            <input
                                id="name"
                                type="text"
                                value={ingredient.name}
                                className="form-control"
                                placeholder="Ingredient Name"
                                onChange={handleIngredientChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Cost Price</label>
                            <input
                                id="cost_price"
                                type="number"
                                value={ingredient.cost_price}
                                className="form-control"
                                placeholder="Cost Price"
                                onChange={handleIngredientChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={ingredient.quantity}
                                className="form-control"
                                placeholder="Quantity"
                                min="1"
                                onChange={handleIngredientChange}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mb-3"
                            onClick={addIngredient}
                        >
                            Add Ingredient
                        </button>
                        <ul>
                            {purchase.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name} - ${ingredient.cost_price} x {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Create Purchase
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
