/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/order.js ***!
  \*******************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// items = JSON.parse(items);
$('.del-btn').on('click', function (e) {
  var id = $(e.target).data('id');
  var find = items.find(function (i) {
    return i.id === id;
  });
  var itemSelector = 'div[data-id=' + id + ']';
  var itemQtySelector = itemSelector + ' .qty';
  var itemAmountSelector = itemSelector + ' .amount';

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
}); // function createOrder(u_cart) {
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

$('#createOrder').submit(function (e) {
  var arCart = [];

  if (items.length !== 0) {
    var _iterator = _createForOfIteratorHelper(items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        item = _step.value;
        arCart.push({
          items_id: item.id,
          qty: item.quantity
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  $('#data').val(JSON.stringify(arCart));
});
/******/ })()
;