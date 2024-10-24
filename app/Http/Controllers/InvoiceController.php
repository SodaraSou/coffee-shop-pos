<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        return Inertia::render('invoice/index');
    }

    public function create()
    {
        return Inertia::render('purchase/index');
    }

    public function store(Request $request) {}

    public function show() {}

    public function destroy() {}

    public function update() {}
}
