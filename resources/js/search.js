 
$('.btn-search').on('click', (e) => {
    e.preventDefault();
    let field = $('.search-field').val();

    $.ajax({
        method: "POST",
        url: "/?a=search",
        data: {searchQuery: field},
        success: (data) => {
            let goods = JSON.parse(data);
            renderProducts(true, goods);
        }
    });
});
$('.btn-default').on('click', (e) => {
    e.preventDefault();
    $.ajax({
        method: "",
        url: "",
        data: "",
        success: () => {
            renderProducts();
        }
    });
});
