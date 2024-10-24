<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'sell_price',
        'cost_price',
        'quantity',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'product_id');
    }

    public function productPreSales(): HasMany
    {
        return $this->hasMany(ProductPreSale::class, 'product_id');
    }

    public function invoices(): BelongsToMany
    {
        return $this->belongsToMany(Invoice::class)
            ->withPivot('discount', 'quantity')
            ->withTimestamps();
    }
}
