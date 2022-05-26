let openCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".btn-close");
let boxCart = document.querySelector(".box__cart");
openCart.addEventListener("click", function (e) {
  boxCart.style.display === "none"
    ? (boxCart.style.display = "block")
    : (boxCart.style.display = "none");
});

closeCart.addEventListener("click", function () {
  document.querySelector(".box__cart").style.display = "none";
});

// Working js

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}

// Marking Function
function ready() {
  // 1.remove Items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  //   console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    // console.log(button);
    button.addEventListener("click", removeCartItems);
  }

  // update quantity input
  let quantityInputs = document.getElementsByClassName("item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }

  // add to cart
  let addCart = document.getElementsByClassName("add-to-cart");
  //   console.log(addCart);
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}
// 4.addCartClicked
function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var name = shopProduct.getElementsByClassName("product__name")[0].innerText;
  var price = shopProduct.getElementsByClassName("product__price")[0].innerText;
  var image = shopProduct.getElementsByClassName("product__img")[0].src;
  // console.log(name, price, image);
  addProductTotal(name, price, image);
  updateTotal();
}

function addProductTotal(name, price, image) {
  var cartShopBox = document.createElement("li");
  cartShopBox.classList.add("clearfix");
  // console.log(cartShopBox);
  var cartItem = document.getElementsByClassName("shopping-cart-items")[0];
  var cartItemsNames = cartItem.getElementsByClassName("item-name");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == name) {
      alert("Bạn đã có sẵn phẩm trong giỏ hàng rồi!");
      return;
    }
  }
  var cartBoxContent = `
                              <img src="${image}" alt="item1" class="item-img" />
                              <div class="item-content">
                                  <span class="item-name">${name}</span>
                                  <span class="item-price">${price}</span>
                                  <div><span>
                                          quantity:
                                      </span> <input type="number" name="" id="" value="1" min="1" class="item-quantity">
                                  </div>
                              </div>
                              <i class='bx bxs-trash cart-remove'></i>
  `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItem.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItems);
  cartShopBox
    .getElementsByClassName("item-quantity")[0]
    .addEventListener("change", quantityChange);
}
//3. quantityChange
function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
// 1.remove Items from cart
function removeCartItems(event) {
  let buttonClicked = event.target;
  //   console.log(buttonClicked);
  buttonClicked.parentElement.remove();
  updateTotal();
}
// 2.update total
function updateTotal() {
  let cartContent = document.getElementsByClassName("shopping-cart-items")[0];
  let cartClearfix = cartContent.getElementsByClassName("clearfix");
  //   console.log(cartClearfix);
  let total = 0;
  for (let i = 0; i < cartClearfix.length; i++) {
    let cartBox = cartClearfix[i];
    let priceElement = cartBox.getElementsByClassName("item-price")[0];
    let quantityElement = cartBox.getElementsByClassName("item-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-money")[0].innerText = "$" + total;
  }
}
