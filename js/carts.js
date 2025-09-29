// let ProductsInCart = localStorage.getItem("ProductsInCart")
// let allProducts = document.querySelector(".products")

// if(ProductsInCart){
//     let item = JSON.parse(ProductsInCart) ;
//     drawCartProducts(item);
// }

// function drawCartProducts(products){
//     let y = products.map((item) => {
//         return `
//         <div class="product_item">
//         <img class="product_item_img" src="${item.imageUrl}" alt="">
//         <div class="product_item_desc">
//             <h2>${item.title}</h2>
//             <p>${item.discription}</p>
//             <span>${item.color}</span>
//             <p>${item.price}</p>
//         </div>
//         <div class="product_item_action">
//         <i class="far fa-heart fav"></i>
//          <button class="add_to_cart" onClick="removeFromCart(${item.id})">Remove From Cart</button>
//         </div>
//     </div>
//         `;
//     }).join("");
//     allProducts.innerHTML = y;
    
// }
 // عرض اسم المستخدم
        let userInfo = document.querySelector("#user_info");
        let userD  = document.querySelector("#user");
        let links = document.querySelector("#links");
        
        if (localStorage.getItem("username")) {
            if (links) links.remove();
            userInfo.style.display = "flex";
            userD.innerHTML = localStorage.getItem("username");
           
        }
                

        let logOutBtn = document.querySelector("#logout");
        if (logOutBtn) {
            logOutBtn.addEventListener("click", function () {
                localStorage.clear();
                setTimeout(() => {
                    window.location = "login.html";
                }, 1500);
            });
        }

        //////////////////////////////////////////////////////////////////////////////////


let ProductsInCart = localStorage.getItem("ProductsInCart");
let ProductsInFav = localStorage.getItem("FavInCart");
let allProducts = document.querySelector(".products");
let FavContainer = document.querySelector('.favProducts')

// لو في منتجات محفوظة
if (ProductsInCart) {
    let item = JSON.parse(ProductsInCart);
    drawCartProducts(item);
}
if (ProductsInFav) {
    let item = JSON.parse(ProductsInFav);
    drawFavProducts(item);
}

// دالة لعرض المنتجات
function drawCartProducts(products) {
    let totalPrice = 0;

    let y = products.map((item) => {
        let itemTotal = item.price * item.Qtty;
        totalPrice += itemTotal;

        return `
        <div class="cart_item">
            <img class="cart_img" src="${item.imageUrl}" alt="">
            
            <div class="cart_details">
                <h2 class="mt-0">${item.title}</h2>
                <p class="m-0">${item.category || ""}</p>
                <span>${item.color}</span>
                <p class="m-0">Unit Price: <strong>${item.price} ${item.currency}</strong></p>
                <p>Total: <strong>${itemTotal} ${item.currency}</strong></p>
            </div>

            <div class="cart_actions">
                <button onClick="decrementItem(${item.id})">-</button>
                <span class="qtty">${item.Qtty}</span>
                <button onClick="incrementItem(${item.id})">+</button>
                <button class="remove_btn" onClick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
        `;
    }).join("");

    // إضافة الإجمالي الكلي أسفل المنتجات
    y += `
      <div class="cart_total w-100" style="font-style: italic;font-size: 20px;   ">
        <h3>Total Cart Price: ${totalPrice} $</h3>
      </div>
    `;

    allProducts.innerHTML = y;
}

function drawFavProducts(products) {
    let y = products.map((item) => {
        return `
        <div class="cart_item flex-column" style=" gap:15px; grid-templat-column: repeat(4,1fr);">
        <img class="cart_img w-100" src="${item.imageUrl}" style="height: 261px;">
            
            <div class="cart_details">
                <h2>${item.title}</h2>
                <p>${item.category || ""}</p>
                <span>${item.color}</span>
            </div>
            <div class="product_fav_icon"style="text-align: center;"  onClick="removeFromFav(${item.id} )">
                <i class="fas fa-heart filled" style="font-size:25px;"></i>
            </div>   
            <input type="hidden" value="${item.id}" />
        </div>
        `;
    }).join("");

    FavContainer.innerHTML = y;
}


function removeFromFav(id) {
    let favItems = JSON.parse(localStorage.getItem("FavInCart")) || [];
    let updatedItems = favItems.filter(item => item.id !== id);
    localStorage.setItem("FavInCart", JSON.stringify(updatedItems));
    drawFavProducts(updatedItems);
}

// دالة الحذف
function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(updatedCart));
    drawCartProducts(updatedCart);
    countCartItems()
}

// دالة + لزيادة الكمية
function incrementItem(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let item = cartItems.find(p => p.id === id);
    if (item) {
        item.Qtty += 1;
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    drawCartProducts(cartItems);
    countCartItems()
}

// دالة - لتقليل الكمية
function decrementItem(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let item = cartItems.find(p => p.id === id);
    if (item) {
        if (item.Qtty > 1) {
            item.Qtty -= 1;
        } else {
            cartItems = cartItems.filter(p => p.id !== id);
        }
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    drawCartProducts(cartItems);
    countCartItems()
}

countCartItems()
function countCartItems() {
    let allProds = document.querySelectorAll(".products .cart_item");
    let itemQtty = 0;
    [].map.call(allProds , item => {
        itemQtty += parseInt(item.querySelector('span.qtty').innerHTML);
        document.querySelector('.shopping_cart .badge').innerHTML = itemQtty

    })
}








// let ProductsInCart = localStorage.getItem("ProductsInCart");
// let allProducts = document.querySelector(".products");

// // لو في منتجات محفوظة
// if (ProductsInCart) {
//     let item = JSON.parse(ProductsInCart);
//     drawCartProducts(item);
// }

// // دالة عرض المنتجات
// function drawCartProducts(products) {
//     let total = 0;

//     let y = products.map((item) => {
//         // تحويل السعر من نص إلى رقم (500 $ → 500)
//         let priceNumber = parseFloat(item.price);
//         let itemTotal = priceNumber * item.qty;
//         total += itemTotal;

//         return `
//         <div class="product_item">
//             <img class="product_item_img" src="${item.imageUrl}" alt="">
//             <div class="product_item_desc">
//                 <h2>${item.title}</h2>
//                 <span>Color: ${item.color}</span>
//                 <p>Price: ${item.price}</p>
//                 <p>Qty: 
//                    <button onclick="decreaseQty(${item.id})">-</button>
//                    ${item.qty}
//                    <button onclick="increaseQty(${item.id})">+</button>
//                 </p>
//                 <p>Subtotal: ${itemTotal} $</p>
//             </div>
//             <div class="product_item_action">
//                 <button onClick="removeFromCart(${item.id})">❌ Remove</button>
//             </div>
//         </div>
//         `;
//     }).join("");

//     // السعر الكلي
//     y += `
//       <div class="cart_total">
//         <h3>Total: ${total} $</h3>
//       </div>
//     `;

//     allProducts.innerHTML = y;
// }

// // دالة الحذف
// function removeFromCart(id) {
//     let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
//     let updatedCart = cartItems.filter(item => item.id !== id);
//     localStorage.setItem("ProductsInCart", JSON.stringify(updatedCart));
//     drawCartProducts(updatedCart);
// }

// زيادة الكمية
function increaseQty(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    cartItems = cartItems.map(item => {
        if (item.id === id) item.qty += 1;
        return item;
    });
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    drawCartProducts(cartItems);
}

// تقليل الكمية
function decreaseQty(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    cartItems = cartItems.map(item => {
        if (item.id === id && item.qty > 1) item.qty -= 1;
        return item;
    });
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    drawCartProducts(cartItems);
}

// دالة الإضافة (تمنع التكرار)
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

    // التحقق إذا المنتج موجود بالفعل
    let existing = cartItems.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1; // زود الكمية
    } else {
        product.qty = 1; // أول مرة يتسجل مع qty
        cartItems.push(product);
        
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    drawCartProducts(cartItems);
}




//////////////////////////////////       منقول من صفحة script2.js     ////////////////////////////////////////////////


let cartProductDiv = document.querySelector(".carts_products div");
        let badge = document.querySelector(".badge");

        let addedItem = localStorage.getItem("ProductsInCart")
            ? JSON.parse(localStorage.getItem("ProductsInCart"))
            : [];

        function saveCart() {
            localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        }

        function renderCart() {
            if (!cartProductDiv) return;
            
            cartProductDiv.innerHTML = "";
            let totalPrice = 0;

            if (addedItem.length === 0) {
                cartProductDiv.innerHTML = `<p style="text-align: center; padding: 20px;"> Empaty Cart</p>`;
                if (badge) {
                    badge.style.display = "none";
                }
                return;
            }

            addedItem.forEach((item) => {
                totalPrice += item.price * item.Qtty;
                cartProductDiv.innerHTML += `
                <div class="cartProduct" product-id="${item.id}" >
                    <p>${item.title}</p>
                    <div>
                        <button onClick="decrementCartItem(${item.id})">-</button>
                        <label class="cartItemQtty">${item.Qtty}</label>
                        <button onClick="incrementCartItem(${item.id})">+</button>   
                    </div>
                      <div>
                      unit price=${item.price} ${item.currency}
                      </div>
                    <div>
                       Total =${item.price * item.Qtty} ${item.currency}
                    </div>
                    <hr>
                </div>
                
                `;
            });

            cartProductDiv.innerHTML += `
                <div class="cartTotal">
                    <strong>Total Price: ${totalPrice} $</strong>
                </div>
            `;

            // تحديث البادج
            if (badge) {
                let totalQtty = addedItem.reduce((sum, item) => sum + item.Qtty, 0);
                badge.style.display = totalQtty > 0 ? "block" : "none";
                badge.innerHTML = totalQtty;
            }
        }

        function addToCart(id) {
            const quantity = productQuantities[id] || 1;
            let product = products.find((p) => p.id === id);
            if (!product) return;
            
            let existing = addedItem.find((p) => p.id === id);

            if (existing) {
                existing.Qtty += quantity;
            } else {
                addedItem.push({ ...product, Qtty: quantity });
                // alert("Item Added To Cart Successfully") 
            }

            let actionContainer = document.querySelector('input[type=hidden][value="'+ id +'"]').closest('.product_item_action')
            actionContainer.classList.add('added')
            // إعادة تعيين كمية المنتج في الصفحة بعد إضافتها إلى السلة
            productQuantities[id] = 0;
            updateProductQuantityDisplay(id);
            
            saveCart();
            renderCart();
            // showAlert("تمت إضافة المنتج إلى السلة", "success");
        }

        // function removeFromCart(id) {
        //     // const quantity = productQuantities[id] || 1;
        //     // let product = addedItem.find((p) => p.id === id);
            
        //     // let prodQtty = product.Qtty || 1

        //     addedItem = addedItem.filter((p) => p.id !== id );
        //     let actionContainer = document.querySelector('input[type=hidden][value="'+ id +'"]').closest('.product_item_action')
        //     actionContainer.classList.remove('added')
        //     saveCart();
        //     renderCart();
        // }


        function incrementCartItem(id) {
            let item = addedItem.find((p) => p.id === id);
            if (item) {
                item.Qtty++;
                saveCart();
                renderCart();
            }
        }

        function decrementCartItem(id) {
            let item = addedItem.find((p) => p.id === id);
            if (item) {
                if (item.Qtty > 1) {
                    item.Qtty--;
                } else {
                    // حذف المنتج
                    addedItem = addedItem.filter((p) => p.id !== id);
                }
                saveCart();
                renderCart();
            }
        }
    // إظهار / إخفاء السلة
        let shoppingCartIcon = document.querySelector(".shopping_cart");
        let cartsProducts = document.querySelector(".carts_products");
        
        if (shoppingCartIcon && cartsProducts) {
            shoppingCartIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                if (cartProductDiv.innerHTML !== "") {
                    cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : "block";
                }
            });
            
            // إغلاق السلة عند النقر خارجها
            document.addEventListener("click", (e) => {
                if (!shoppingCartIcon.contains(e.target) && !cartsProducts.contains(e.target)) {
                    cartsProducts.style.display = "none";
                }
            });
            
            // منع إغلاق السلة عند النقر داخلها
            cartsProducts.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }


        // //////////////////////////////////////////////////////////////////////////////////////





