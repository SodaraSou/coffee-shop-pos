<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('purchase/index', [
            'purchases' => Purchase::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('purchase/create');
    }

    public function store(Request $request)
    {
        foreach ($request->products as $product) {
            Purchase::create([
                'name' => $product['name'],
                'total_price' => $product['total_price'],
                'measure' => $product['measure'],
                'user_id' => Auth::id(),
            ]);
        }
        return redirect()->route('purchase.index');
    }

    public function show() {}

    public function destroy() {}

    public function update() {}
}
