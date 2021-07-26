<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrderController extends Controller
{
    private $model;
    public function __construct(Orders $orders)
    {
        $this->model = $orders;
    }

    public function index(Request $request)
    {
        $userBasket = $this->model->initBasket($request->input('Cart'));
        return view('order', ['basket' => $userBasket]);
    }

    public function create(Request $request)
    {
        $this->model->user_phone = $request->input('phone-number');
        $this->model->amount = $request->input('amount');

        if ($this->model->save()) {
            $this->model->items()->attach(
                json_decode($request->input('Cart'), true)
            );
        }
        return view('order', ['orderId' => $this->model->id]);
    }
}
