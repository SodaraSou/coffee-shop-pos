<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('product/index', ['products' => Product::all()]);
    }

    public function show() {}

    public function create()
    {
        return Inertia::render('product/create');
    }

    public function store(Request $request)
    {
        Product::create([
            'name' => $request->name,
            'price' => $request->sell_price,
            'sell_price' => $request->sell_price,
            'cost_price' => $request->cost_price,
            'quantity' => $request->quantity,
        ]);
        return redirect()->route('product.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('product/edit', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $product->update([
            'name' => $request->name,
            'price' => $request->sell_price,
            'sell_price' => $request->sell_price,
            'cost_price' => $request->cost_price,
            'quantity' => $request->quantity,
        ]);
        return redirect()->route('product.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
