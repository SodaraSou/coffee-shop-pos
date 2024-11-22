<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', [HomeController::class, 'index'])->middleware('auth')->name('home');
Route::resource('/product', ProductController::class)->middleware('auth');
Route::resource('/invoice', InvoiceController::class)->middleware('auth');
Route::resource('/purchase', PurchaseController::class)->middleware('auth');
Route::resource('/report', ReportController::class)->middleware('auth');
Route::resource('/stock', StockController::class)->middleware('auth');

Auth::routes();
