<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Models\Invoice;
use App\Models\InvoiceProduct;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::select('id', 'total_price', 'discount', 'user_id')->get();

        return Inertia::render('invoice/index', [
            'invoices' => $invoices,
        ]);
    }

    public function create()
    {
        $userId = Auth::user()->id; // Get the authenticated user's ID
        $products = Product::select('id', 'name', 'sell_price')->get();

        return Inertia::render('invoice/create', [
            'products' => $products,
            'user_id' => $userId,
        ]);
    }

    public function store(Request $request)
    {
        // Step 1: Validate incoming data
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure the user exists
            'discount' => 'required|numeric|min:0|max:100', // Invoice-level discount
            'products' => 'required|array', // Ensure products are provided
        ]);

        // Step 2: Calculate the total price of the invoice
        $totalPrice = collect($validated['products'])->reduce(function ($total, $product) {
            $productTotal = $product['quantity'] * $product['sell_price']; // Calculate product total (without discount)
            $productDiscount = $productTotal * ($product['discount'] ?? 0) / 100; // Calculate product discount
            return $total + ($productTotal - $productDiscount); // Add discounted price to total
        }, 0);

        // Apply the overall invoice discount
        $totalPriceAfterDiscount = $totalPrice - ($totalPrice * ($validated['discount'] / 100));

        // Step 3: Create the invoice
        $invoice = Invoice::create([
            'user_id' => $validated['user_id'],
            'discount' => $validated['discount'],
            'total_price' => $totalPriceAfterDiscount,
        ]);

        // Step 4: Create invoice products
        foreach ($validated['products'] as $product) {
            InvoiceProduct::create([
                'invoice_id' => $invoice->id, // Link the invoice to the products
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'sell_price' => $product['sell_price'],
                'discount' => $product['discount'] ?? 0, // Use 0 if no discount is provided
            ]);
        }

        // Step 5: Redirect to the invoice list (or any other route)
        return redirect()->route('invoice.index')->with('success', 'Invoice created successfully!');
    }

    public function edit(Invoice $invoice)
    {
        $products = Product::all();
        $invoiceProducts = InvoiceProduct::where('invoice_id', $invoice->id)->get();

        return Inertia::render('invoice/edit', [
            'invoiceData' => [
                'id' => $invoice->id,
                'user_id' => $invoice->user_id,
                'total_price' => $invoice->total_price,
                'products' => $invoiceProducts,
                'discount' => $invoice->discount,
            ],
            'products' => $products,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Step 1: Validate incoming data
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure the user exists
            'discount' => 'required|numeric|min:0|max:100', // Invoice-level discount
            'products' => 'required|array', // Ensure products are provided
        ]);

        // Step 2: Find the invoice by ID and update it
        $invoice = Invoice::findOrFail($id);
        $invoice->user_id = $validated['user_id'];
        $invoice->discount = $validated['discount'];

        // Step 3: Calculate the total price of the invoice
        $totalPrice = collect($validated['products'])->reduce(function ($total, $product) {
            $productTotal = $product['quantity'] * $product['sell_price']; // Calculate product total (without discount)
            $productDiscount = $productTotal * ($product['discount'] ?? 0) / 100; // Calculate product discount
            return $total + ($productTotal - $productDiscount); // Add discounted price to total
        }, 0);

        // Apply the overall invoice discount
        $totalPriceAfterDiscount = $totalPrice - ($totalPrice * ($validated['discount'] / 100));


        // Step 4: Update the total price in the invoice
        $invoice->total_price = $totalPriceAfterDiscount;
        $invoice->save();

        // Step 5: Remove existing invoice products before updating
        InvoiceProduct::where('invoice_id', $invoice->id)->delete();

        // Step 6: Create or update the products in the invoice
        foreach ($validated['products'] as $product) {
            InvoiceProduct::create([
                'invoice_id' => $invoice->id, // Link the invoice to the products
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'sell_price' => $product['sell_price'],
                'discount' => $product['discount'] ?? 0, // Use 0 if no discount is provided
            ]);
        }

        // Step 7: Redirect to the invoice list or any other route
        return redirect()->route('invoice.index')->with('success', 'Invoice updated successfully!');
    }



    public function show()
    {

    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
    }

}
