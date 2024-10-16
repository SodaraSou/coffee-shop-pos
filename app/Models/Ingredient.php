<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ingredient extends Model
{
    protected $fillable = [
        'purchase_id',
        'product_pre_sale_id',
        'measure_per_cup',
    ];

    public function purchase(): BelongsTo
    {
        return $this->belongsTo(Purchase::class);
    }

    public function productPreSale(): BelongsTo
    {
        return $this->belongsTo(ProductPreSale::class);
    }
}
