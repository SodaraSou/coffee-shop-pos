<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'cost_price',
        'quantity',
        'purchase_id',
    ];

    /**
     * Get the purchase that owns the ingredient.
     */
    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }
}
