<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Product;

class StockController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        // Get the start and end of the current month
        $startOfCurrentMonth = $now->copy()->startOfMonth();
        $endOfCurrentMonth = $now->copy()->endOfMonth();

        // Get the start and end of the last month
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

        // Get the start and end of the month before last
        $startOfBeforeLastMonth = $now->copy()->subMonths(2)->startOfMonth();
        $endOfBeforeLastMonth = $now->copy()->subMonths(2)->endOfMonth();
        $productRecords = [];

        $sales = Invoice::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])->get();
        foreach ($sales as $sale) {
            $productInvoices = InvoiceProduct::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
                ->WhereIn('invoice_id', function ($query) use ($sale) {
                    $query->select('id')->from('invoices')->where('invoice_id', $sale->id);
                })
                ->get();

            foreach ($productInvoices as $invoice) {
                $product = Product::where('id', $invoice->product_id)->get();
                if ($product) {
                    if (isset($productRecords[$invoice->product_id])) {
                        // If it exists, increment the quantity
                        $productRecords[$invoice->product_id]['quantity'] += $invoice->quantity;
                    } else {
                        // If it doesn't exist, add it with the quantity
                        $productRecords[$invoice->product_id] = [
                            'product_id' => $invoice->product_id,
                            'product_price' => $product[0]->sell_price,
                            'product_name' => $product[0]->name,
                            'quantity' => $invoice->quantity
                        ];
                    }
                }
            }
        }

        $sales = Invoice::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->get();
        foreach ($sales as $sale) {
            $productInvoices = InvoiceProduct::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
                ->WhereIn('invoice_id', function ($query) use ($sale) {
                    $query->select('id')->from('invoices')->where('invoice_id', $sale->id);
                })
                ->get();

            foreach ($productInvoices as $invoice) {
                $product = Product::where('id', $invoice->product_id)->get();
                if ($product) {
                    if (isset($productRecords[$invoice->product_id])) {
                        // If it exists, increment the quantity
                        $productRecords[$invoice->product_id]['quantity'] += $invoice->quantity;
                    } else {
                        // If it doesn't exist, add it with the quantity
                        $productRecords[$invoice->product_id] = [
                            'product_id' => $invoice->product_id,
                            'product_price' => $product[0]->sell_price,
                            'product_name' => $product[0]->name,
                            'quantity' => $invoice->quantity
                        ];
                    }
                }
            }
        }

        $sales = Invoice::whereBetween('created_at', [$startOfBeforeLastMonth, $endOfBeforeLastMonth])->get();
        foreach ($sales as $sale) {
            $productInvoices = InvoiceProduct::whereBetween('created_at', [$startOfBeforeLastMonth, $endOfBeforeLastMonth])
                ->WhereIn('invoice_id', function ($query) use ($sale) {
                    $query->select('id')->from('invoices')->where('invoice_id', $sale->id);
                })
                ->get();

            foreach ($productInvoices as $invoice) {
                $product = Product::where('id', $invoice->product_id)->get();
                if ($product) {
                    if (isset($productRecords[$invoice->product_id])) {
                        // If it exists, increment the quantity
                        $productRecords[$invoice->product_id]['quantity'] += $invoice->quantity;
                    } else {
                        // If it doesn't exist, add it with the quantity
                        $productRecords[$invoice->product_id] = [
                            'product_id' => $invoice->product_id,
                            'product_price' => $product[0]->sell_price,
                            'product_name' => $product[0]->name,
                            'quantity' => $invoice->quantity
                        ];
                    }
                }
            }
        }

        $allIngrediants = [];
        $totalSpend = 0;
        // get purchase during those time
        $allPurchases = Purchase::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])->get();
        foreach ($allPurchases as $purchase) {
            $totalSpend = $totalSpend + $purchase->spend_money;
            $allIngrediants[] = Ingredient::where('purchase_id', $purchase->id)->get();
        }

        $allPurchases = Purchase::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->get();
        foreach ($allPurchases as $purchase) {
            $totalSpend = $totalSpend + $purchase->spend_money;
            $allIngrediants[] = Ingredient::where('purchase_id', $purchase->id)->get();
        }

        $allPurchases = Purchase::whereBetween('created_at', [$startOfBeforeLastMonth, $endOfBeforeLastMonth])->get();
        foreach ($allPurchases as $purchase) {
            $totalSpend = $totalSpend + $purchase->spend_money;
            $allIngrediants[] = Ingredient::where('purchase_id', $purchase->id)->get();
        }


        // dd($allIngrediants);




        return Inertia::render('report/stock', [
            "stocks" => [
                "totalSpend" => $totalSpend,
                "allIngrediants" => $allIngrediants,
                "productRecords" => $productRecords
            ]
        ]);
    }


    public function show()
    {

    }
}
