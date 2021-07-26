@extends('layouts.default')
@section('title', $title ?? '')
@if (isset($basket))
    @section('script')
        <script>
            var items = {!! json_encode($basket['items']) !!};
            var amount = {!! $basket['amount'] !!}
        </script>
    @endsection

    @section('content')

        <div class="container">
            <div class="row align-items-start">
                <div class="col">
                    Image
                </div>
                <div class="col">
                    Name
                </div>
                <div class="col">
                    Price
                </div>
                <div class="col">
                    Quantity
                </div>
                <div class="col">
                    Amount
                </div>
                <div class="col">
                    Actions
                </div>
            </div>
            @foreach($basket['items'] as $item)
                <div class="row align-items-center" data-id="{{$item->id}}">
                    <div class="col">
                        <img src="{{$item->img}}" alt="Some image">
                    </div>
                    <div class="col">
                        <p class="product-title">{{$item->name}}</p>
                    </div>

                    <div class="col">
                        <p class="product-single-price">${{$item->price}} each</p>
                    </div>
                    <div class="col">
                        <p class="product-quantity">Quantity: <span class="qty">{{$item->quantity}}</span></p>
                    </div>
                    <div class="col">
                        <p class="product-price">$<span class="amount">{{$item->itemAmount}}</span></p>
                    </div>
                    <div class="col">
                        <button class="del-btn" data-id="{{$item->id}}">&times;</button>
                    </div>
                </div>
            @endforeach

        </div>

    <form action="/order/create" method="POST" id="createOrder">
        @csrf
        <input id="data" type="hidden" name="Cart"/>
        <label for="sum">сумма: <span class="total-amount">{{$basket['amount']}}</span></label>
        <input id="sum" type="hidden" name="amount" value="{{$basket['amount']}}">
        <p>Введите номер телефона для подтверждения заказа:</p>
        <p><input type="tel" name="phone-number" placeholder="+7 (900) 123-45-67" value="+7 (900) 123-45-67" ></p>
    {{--    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]"--}}
        <button class="order-btn" on>Заказать</button>
    </form>


    @endsection
@elseif (isset($orderId))

    @section('content')
    <h1>OrderID: {{$orderId}}</h1>
    <form action="/?c=orderList&a=index" method="POST">
        <p>Введите номер телефона для просмотра заказов:</p>
        <p><input type="tel" name="phone-number" placeholder="+7 (900) 123-45-67" value="+7 (900) 123-45-67" ></p>
    {{--    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]"--}}
        <button class="check-btn">Посмотреть</button>
    </form> </br>
    <form action="/" method="POST">
        <button class="check-btn">на главную</button>
    </form>
    @endsection
@endif

@section('addingJS')
    <script src="{{ mix('js/order.js') }}"></script>
@endsection
