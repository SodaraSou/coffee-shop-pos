<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductPreSale extends Model
{
    protected $fillable = [
        'product_id', 'price'
    ];

    public function ingredients(): HasMany
    {
        return $this->hasMany(Ingredient::class, 'product_pre_sale_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
