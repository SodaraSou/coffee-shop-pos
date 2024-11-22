<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Purchase;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::select('id', 'total_pay', 'spend_money', 'user_id')->get();

        return Inertia::render('purchase/index', [
            'invoices' => $purchases,
        ]);
    }

    public function create()
    {
        $userId = Auth::user()->id; // Get the authenticated user's ID

        return Inertia::render(
            'purchase/create',
            [
                'user_id' => $userId,
            ]
        );
    }

    public function store(Request $request)
    {
        // Step 1: Validate incoming data
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure the user exists
            'spend_money' => 'required|numeric|min:0', // Spend money validation
            'ingredients' => 'required|array|min:1', // Ensure ingredients are provide
        ]);

        // Step 2: Create the purchase
        $purchase = Purchase::create([
            'user_id' => $validated['user_id'],
            'spend_money' => $validated['spend_money'],
            'total_pay' => 0, // We'll calculate this later after adding the ingredients
        ]);

        // Step 3: Add ingredients to the purchase and calculate the total
        $totalPay = 0; // Initialize total pay

        foreach ($validated['ingredients'] as $ingredientData) {
            // Step 4: Create the ingredient
            $ingredient = Ingredient::create([
                'name' => $ingredientData['name'],
                'cost_price' => $ingredientData['cost_price'],
                'quantity' => $ingredientData['quantity'],
                'purchase_id' => $purchase->id, // Link the ingredient to the purchase
            ]);

            // Add the ingredient cost to the total pay
            $totalPay += $ingredientData['cost_price'] * $ingredientData['quantity'];
        }

        // Step 5: Update the total_pay for the purchase after calculating ingredient totals
        $purchase->update([
            'total_pay' => $totalPay,
        ]);

        // Step 6: Redirect to the purchase list (or any other route)
        return redirect()->route('purchase.index')->with('success', 'Purchase created successfully!');
    }

    public function edit(Purchase $purchase)
    {

        $purchaseIngredient = Ingredient::where('purchase_id', $purchase->id)->get();

        return Inertia::render('purchase/edit', [
            'purchaseData' => [
                'id' => $purchase->id,
                'user_id' => $purchase->user_id,
                'total_pay' => $purchase->total_pay,
                'spend_money' => $purchase->spend_money,
                'ingredients' => $purchaseIngredient,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'spend_money' => 'required|numeric',
            'total_pay' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'ingredients' => 'required|array'
        ]);

        // Find the purchase record by ID
        $purchase = Purchase::findOrFail($id);

        // Update the purchase details
        $purchase->spend_money = $validated['spend_money'];
        $purchase->total_pay = $validated['total_pay'];
        $purchase->user_id = $validated['user_id'];
        $purchase->save();

        // Update the ingredients (you may also want to handle this with additional logic if needed)
        Ingredient::where('purchase_id', $purchase->id)->delete();

        // Save the new ingredients
        foreach ($validated['ingredients'] as $ingredientData) {
            Ingredient::create([
                'name' => $ingredientData['name'],
                'cost_price' => $ingredientData['cost_price'],
                'quantity' => $ingredientData['quantity'],
                'purchase_id' => $purchase->id,
            ]);
        }

        return redirect()->route('purchase.index')->with('success', 'Invoice updated successfully!');
    }


    public function destroy(Purchase $purchase)
    {
        // Delete related ingredients
        Ingredient::where('purchase_id', $purchase->id)->delete();
        // Now delete the purchase
        $purchase->delete();
    }


    public function show()
    {

    }
}
