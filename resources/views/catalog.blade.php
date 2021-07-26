@extends('layouts.default')
@section('script')
<script>
    var items = {!! json_encode($items) !!};
</script>
@endsection

{{--@section('title', $title)--}}

@section('headerAdditions')
<form action="/?c=orderList&a=index" method="POST">
    <p>Введите номер телефона для просмотра заказов:</p>
    <input type="tel" name="phone-number" placeholder="+7 (900) 123-45-67" value="+7 (900) 123-45-67" >
{{--    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]"--}}
    <button class="check-btn">Посмотреть</button>
</form>
<div class="cart">
    <form action="/?a=search" class="search-form">
        <button class="btn-default" type="button">отмена</button>
        <input type="text" class="search-field" name="searchQuery" required="required">
        <button class="btn-search">
            <i class="fas fa-search"></i>
        </button>
    </form>
    <button class="btn-cart" type="button">Корзина</button>
    <div class="cart-block invisible"></div>
</div>
@endsection

@section('content')
    <div class="products"></div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Modal body
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>
    </div>
@endsection

@section('addingJS')
    <script src="{{ mix('js/app.js') }}"></script>
@endsection
