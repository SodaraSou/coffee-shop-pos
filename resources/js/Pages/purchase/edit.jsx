import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function EditPurchase({ purchaseData }) {
    console.log(purchaseData.total_pay);

    const [purchase, setPurchase] = useState({
        total_pay: purchaseData.total_pay || 0, // Initialize with purchase data
        spend_money: purchaseData.spend_money || "",
        user_id: purchaseData.user_id || "",  // Use passed user_id
        ingredients: purchaseData.ingredients || [], // Prepopulate ingredients
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

    // Remove an ingredient from the list
    const removeIngredient = (index) => {
        setPurchase((prev) => {
            const updatedIngredients = prev.ingredients.filter((_, i) => i !== index);
            const totalPay = updatedIngredients.reduce((total, ingredient) => {
                return total + ingredient.cost_price * ingredient.quantity;
            }, 0);

            return {
                ...prev,
                ingredients: updatedIngredients,
                total_pay: totalPay, // Update total pay
            };
        });
    };

    // Handle form submission for editing the purchase and associated ingredients
    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseData1 = {
            total_pay: purchase.total_pay, // Use the calculated total
            spend_money: purchase.spend_money,
            user_id: purchase.user_id,
            ingredients: purchase.ingredients.map((ingredient) => ({
                name: ingredient.name,
                cost_price: ingredient.cost_price,
                quantity: ingredient.quantity,
            })),
        };
        console.log("Data to send:", purchaseData1);


        // Submit data via Inertia
        router.put(`/purchase/${purchaseData.id}`, purchaseData1);
    };

    return (
        <div className="container">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Edit Purchase</h3>
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
                        <h5>Update Ingredients</h5>
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
                        <ul className="list-group">
                            {purchase.ingredients.map((ingredient, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        {ingredient.name} - ${ingredient.cost_price} x {ingredient.quantity}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeIngredient(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                            Update Purchase
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
