<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    public function initBasket($jsonItems)
    {
        $arItems = json_decode($jsonItems);
        $userBasket = [
            'amount' => 0
        ];

        foreach ($arItems as $k=>$item) {
            $itemAmount = $item->quantity * $item->price;
            $arItems[$k]->{'itemAmount'} = $itemAmount;
            $userBasket['amount'] += $itemAmount;
        }

        $userBasket['items'] =  $arItems;
        return $userBasket;
    }

    public function items()
    {
        return $this->belongsToMany(Items::class);
    }
}
