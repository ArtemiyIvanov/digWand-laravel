// items = JSON.parse(items);

$('.del-btn').on('click', (e) => {
    let id = $(e.target).data('id');
    let find = items.find(i => i.id===id);
    let itemSelector = 'div[data-id=' + id + ']';
    let itemQtySelector = itemSelector + ' .qty';
    let itemAmountSelector = itemSelector + ' .amount'
    if (find.quantity > 1) {
        find.quantity--;
        $(itemQtySelector).text(find.quantity);
    } else {
        items.splice(items.indexOf(find), 1);
        $(itemSelector).remove();
    }
    find.itemAmount -= find.price;
    $(itemAmountSelector).text(find.itemAmount);
    amount -= find.price;
    $('.total-amount').text(amount);
    $('#sum').val(amount);

});

// function createOrder(u_cart) {
//     let arCart = [];
//     if (u_cart.length !== 0) {
//     	for (item of u_cart) {
//     		arCart.push({
//     			item_id: item.id,
//     			qty: item.quantity
//     		});
//     	}
//     }
//     $('#data').val(JSON.stringify(arCart));
// }

$('#createOrder').submit((e) => {
    let arCart = [];
    if (items.length !== 0) {
        for (item of items) {
            arCart.push({
                items_id: item.id,
                qty: item.quantity
            });
        }
    }
    $('#data').val(JSON.stringify(arCart));
})
