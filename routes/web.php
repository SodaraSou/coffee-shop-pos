<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::resource('/purchase', PurchaseController::class)->middleware('auth');
Route::resource('/invoice', InvoiceController::class)->middleware('auth');

Auth::routes();
