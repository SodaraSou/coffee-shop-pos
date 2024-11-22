<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Termwind\render;
use Carbon\Carbon;
use Ramsey\Uuid\Type\Decimal;

class ReportController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        // Get the start and end of the current month
        $startOfCurrentMonth = $now->copy()->startOfMonth();
        $endOfCurrentMonth = $now->copy()->endOfMonth();
        $total_sale1 = 0;
        $total_profit1 = 0;
        $total_spend1 = 0;
        $productRecords = [];
        $totalSales = 0;


        // Query invoices where create_time is within these date ranges
        $sales = Invoice::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])->get();
        foreach ($sales as $sale) {
            $total_sale1 = $total_sale1 + $sale->total_price;
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
                    $totalSales = $totalSales + $invoice->quantity;
                    $temp = ($product[0]->sell_price - $product[0]->cost_price) * $invoice->quantity;
                    $total_profit1 = $total_profit1 + ($temp - $invoice->discount * $temp / 100);
                }
            }
        }


        $purchases = Purchase::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])->get();
        foreach ($purchases as $purchase) {
            $total_spend1 = $total_spend1 + $purchase->spend_money;
        }

        // Get the start and end of the last month
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();
        $total_sale2 = 0;
        $total_profit2 = 0;
        $total_spend2 = 0;

        $sales = Invoice::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->get();
        foreach ($sales as $sale) {
            $total_sale2 = $total_sale2 + $sale->total_price;
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
                    $totalSales = $totalSales + $invoice->quantity;
                    $temp = ($product[0]->sell_price - $product[0]->cost_price) * $invoice->quantity;
                    $total_profit2 = $total_profit2 + ($temp - $invoice->discount * $temp / 100);
                }

            }
        }


        $purchases = Purchase::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->get();
        foreach ($purchases as $purchase) {
            $total_spend2 = $total_spend2 + $purchase->spend_money;
        }

        // Get the start and end of the month before last
        $startOfBeforeLastMonth = $now->copy()->subMonths(2)->startOfMonth();
        $endOfBeforeLastMonth = $now->copy()->subMonths(2)->endOfMonth();
        $total_sale3 = 0;
        $total_profit3 = 0;
        $total_spend3 = 0;

        $sales = Invoice::whereBetween('created_at', [$startOfBeforeLastMonth, $endOfBeforeLastMonth])->get();
        foreach ($sales as $sale) {
            $total_sale3 = $total_sale3 + $sale->total_price;
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
                    $totalSales = $totalSales + $invoice->quantity;
                    $temp = ($product[0]->sell_price - $product[0]->cost_price) * $invoice->quantity;
                    $total_profit3 = $total_profit3 + ($temp - $invoice->discount * $temp / 100);
                }
            }
        }


        $purchases = Purchase::whereBetween('created_at', [$startOfBeforeLastMonth, $endOfBeforeLastMonth])->get();
        foreach ($purchases as $purchase) {
            $total_spend3 = $total_spend3 + $purchase->spend_money;
        }

        $startOfBeforeLastMonthFormatted = date('F', strtotime($startOfBeforeLastMonth)); // "August"
        $startOfLastMonthFormatted = date('F', strtotime($startOfLastMonth));           // "September"
        $startOfCurrentMonthFormatted = date('F', strtotime($startOfCurrentMonth));     // "October"

        $allProducts = Product::all();

        // Loop through all products and check if they are already in $productRecords
        foreach ($allProducts as $product) {
            // If the product doesn't exist in $productRecords, add it with quantity = 0
            if (!isset($productRecords[$product->id])) {
                $productRecords[$product->id] = [
                    'product_id' => $product->id,
                    'product_price' => $product->sell_price,
                    'product_name' => $product->name,
                    'quantity' => 0 // Set quantity to 0 for missing products
                ];
            }
        }

        uasort($productRecords, function ($a, $b) {
            return $b['quantity'] - $a['quantity']; // Sorting by quantity in descending order
        });

        $salesData = [
            'labels' => [
                $startOfBeforeLastMonthFormatted,
                $startOfLastMonthFormatted,
                $startOfCurrentMonthFormatted
            ],
            'datasets' => [
                [
                    'label' => 'Total-Sale ($)',
                    'data' => [
                        $total_sale3,
                        $total_sale2,
                        $total_sale1
                    ],
                    'borderColor' => 'rgb(255, 99, 132)',
                    'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
                    'tension' => 0.1
                ]
            ]
        ];
        $profitsData = [
            'labels' => [
                $startOfBeforeLastMonthFormatted,
                $startOfLastMonthFormatted,
                $startOfCurrentMonthFormatted
            ],
            'datasets' => [
                [
                    'label' => 'Total-Profit ($)',
                    'data' => [
                        $total_profit3,
                        $total_profit2,
                        $total_profit1
                    ],
                    'borderColor' => 'rgb(75, 192, 192)',
                    'backgroundColor' => 'rgba(75, 192, 192, 0.2)',
                    'tension' => 0.1
                ]
            ]
        ];
        $spendsData = [
            'labels' => [
                $startOfBeforeLastMonthFormatted,
                $startOfLastMonthFormatted,
                $startOfCurrentMonthFormatted
            ],
            'datasets' => [
                [
                    'label' => 'Total-Spend ($)',
                    'data' => [
                        $total_spend3,
                        $total_spend2,
                        $total_spend1
                    ],
                    'borderColor' => 'rgb(255, 99, 132)',
                    'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
                    'tension' => 0.1
                ]
            ]
        ];


        $total_salesd = $total_sale1 + $total_sale2 + $total_sale3;
        $total_salesr = $total_salesd * 4100;
        $total_profitsd = $total_profit1 + $total_profit2 + $total_profit3;
        $total_profitsr = $total_profitsd * 4100;
        $total_spendsd = $total_spend1 + $total_spend2 + $total_spend2;
        $total_spendsr = $total_spendsd * 4100;

        $total_spendsr = floor($total_spendsr / 100) * 100;
        $total_spendsd = number_format($total_spendsd, 2, '.', '');  // Ensures 2 decimal places
        $total_spendsr = number_format($total_spendsr, 2, '.', '');  // Ensures 2 decimal places


        $total_profitsr = floor($total_profitsr / 100) * 100;
        $total_profitsd = number_format($total_profitsd, 2, '.', '');  // Ensures 2 decimal places
        $total_profitsr = number_format($total_profitsr, 2, '.', '');  // Ensures 2 decimal places

        // Round down to the nearest 100
        $total_salesr = floor($total_salesr / 100) * 100;
        $total_salesd = number_format($total_salesd, 2, '.', '');  // Ensures 2 decimal places
        $total_salesr = number_format($total_salesr, 2, '.', '');  // Ensures 2 decimal places




        // dd($total_sales);

        return Inertia::render('report/index', [
            'reports' => [
                'total_salesd' => $total_salesd,
                'total_salesr' => $total_salesr,
                'total_profitsd' => $total_profitsd,
                'total_profitsr' => $total_profitsr,
                'total_spendsd' => $total_spendsd,
                'total_spendsr' => $total_spendsr,
                'salesData' => $salesData,
                'profitsData' => $profitsData,
                'spendsData' => $spendsData,
                'productRecords' => $productRecords,
                'totalSales' => $totalSales,
            ],
        ]);
    }


    public function show()
    {

    }
}
