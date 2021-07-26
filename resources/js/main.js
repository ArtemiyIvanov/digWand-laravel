//заглушки (имитация базы данных)
const image = 'https://via.placeholder.com/150';
const cartImage = 'https://via.placeholder.com/100x80';

//Глобальные сущности
var list = fetchData();
var userCart = []; //массив добавленных юзером товаров

//блок открытой корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
	document.querySelector('.cart-block').classList.toggle('invisible')
})


// нажатие кнопки купить
document.querySelector('.products').addEventListener('click', (evt) => {
	if (evt.target.classList.contains('buy-btn')) {
		addProduct(evt.target);
	}
})

// нажатие кнопки удалить из корзины
document.querySelector('.cart-block').addEventListener('click', (evt) => {
	if (evt.target.classList.contains('del-btn')) {
		removeProduct(evt.target);
	}
})


// функция создает массив запуска функции createProduct для каждого товара
function fetchData() {
	let arr = [];
	items.forEach(item => {
		arr.push(createProduct(item));
	});
	return arr
}

// функция создания товара(объекта) с соответствующими атрибутами (полями), в т.ч функции создания шаблона верстки
function createProduct(item) {
	return {
		id: item.id,
		name: item.name,
		price: item.price,
		img: image, //изображение товара
		quantity: 0, //счетчик количества
		createTemplate: function () {//шаблон верстки
			return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button type="button" class="btn btn-primary info-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${this.id}">
                            Инфо
                            </button>
                            <button class="buy-btn"
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
		}
	}
}

//функция размещения созданных товаров в блоке products
function renderProducts(search = false, items = []) {
	if (!search) {
		let arr = [];
		for (item of list) {
			arr.push(item.createTemplate())
		}
		document.querySelector('.products').innerHTML = arr.join();
	} else {
		let arr = [];
		items.forEach((item) => {
			let prod = createProduct(item);
			arr.push(prod.createTemplate());
		});
		document.querySelector('.products').innerHTML = arr.join();
	}

}

//вызов функции размещения товаров
renderProducts();


//CART
//функция добавления товара в корзину, если такой товар уже есть, увеличение количества соответствующего товара
function addProduct(product) {
	let productId = +product.dataset['id'];
	let find = userCart.find(element => element.id === productId);

	if (!find) {
		userCart.push({
			name: product.dataset['name'],
			id: productId,
			img: cartImage,
			price: +product.dataset['price'],
			quantity: 1
		})
	} else {
		find.quantity++
	}
	console.log(userCart);
	renderCart();
}

//фунция удаления товара из корзины
function removeProduct(product) {
	let productId = +product.dataset['id'];
	let find = userCart.find(element => element.id === productId)
	//либо find = userCart [?] (obj) || false

	if (find.quantity > 1) {
		find.quantity--
	} else {
		userCart.splice(userCart.indexOf(find), 1);
		document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
	}
	renderCart();
}



//функция размещения товаров в корзине
function renderCart() {
	let allProducts = '';
	for (item of userCart) {
		allProducts += `<div class="cart-item" data-id="${item.id}">
                            <div class="product-bio">
                                <img src="${item.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${item.name}</p>
                                    <p class="product-quantity">Quantity: ${item.quantity}</p>
                                    <p class="product-single-price">$${item.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${item.quantity * item.price}</p>
                                <button class="del-btn" data-id="${item.id}">&times;</button>
                            </div>
                        </div>`
	}
	if (allProducts != ''){
		allProducts += `<form action="/order" method="POST" class="order-block">
                            <input id="csrf" type="hidden" name="_token">
							<input id="data" type="hidden" name="Cart"/>
							<button class="order-btn">оформить заказ</button>
						</form>`;
	}
	document.querySelector('.cart-block').innerHTML = allProducts;
	prepareCart(userCart);
}

function prepareCart(u_cart) {
    let token = $('meta[name="csrf-token"]').attr('content');
    console.log(token)
    $('#csrf').val(token)
    $('#data').val(JSON.stringify(u_cart));
}


$('.info-btn').click((e) => {
    let id = $(e.target).data('id')
    $('.modal-content').css('display', 'none')
    $('.spinner-border').css('display', 'block')
    $.get('/catalog/'+id, (data) => {
        $('.modal-content').css('display', 'block')
        $('.spinner-border').css('display', 'none')
        $('.modal-title').text(data.name)
        $('.modal-body').text(data.price)
    });
})



