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

           





        // المنتجات
        let allProducts = document.querySelector(".products");
        let alertBox = document.querySelector(".alert");
        

        function showAlert(message, type) {
            alertBox.textContent = message;
            alertBox.classList.add(type);
            alertBox.style.display = "block";
            
            setTimeout(() => {
                alertBox.style.display = "none";
                alertBox.classList.remove(type);
            }, 2000);
        }

        let products = [
            { id: 1, title: "Watch 32", category: "advanced watch",catID:"advancedWatch", color: "silver", price: 200, currency: "$", imageUrl: "js1/images/w32.jpg" },
            { id: 2, title: "Rolex Watch", category: "advanced watch",catID:"advancedWatch", color: "gold", price: 250, currency: "$", imageUrl: "images/rolex-watch.jpg" },
            { id: 3, title: "Oppo Reno 7", category: "Mobile", catID:"Mobile",color: "black", price: 500, currency: "$", imageUrl: "images/oppo reno 7.jpg" },
            { id: 4, title: "iPhone 15", category: "Mobile", catID:"Mobile",color: "white", price: 600, currency: "$", imageUrl: "images/iphone-15-2.png" },
            { id: 5, title: "Samsung S25", category: "Mobile", catID:"Mobile",color: "gray", price: 550, currency: "$", imageUrl: "images/samsung-galaxy-s25-ultra.png" },
            { id: 6, title: "iphone 16pro max", category: "Mobile", catID:"Mobile",color: "bronze", price: 700, currency: "$", imageUrl: "images/iphone-16-pro-max2.png" },
            { id: 7, title: "Car 19", category: "toy car", catID:"toyCar",color: "dark blue", price: 1000, currency: "$", imageUrl: "images//car19.jpg" },
            { id: 8, title: "Car 20", category: "toy car", catID:"toyCar",color: "red", price: 90, currency: "$", imageUrl: "images/bmw.jpg" },
            { id: 9, title: "car 21", category: "toy car", catID:"toyCar",color: "green", price: 300, currency: "$", imageUrl: "images//car20.jpg" }
        ];

        // كائن لتخزين كميات المنتجات في الصفحة
        let productQuantities = {};

        function drawItems() {
            if (!allProducts) return;
            
            let y = products.map((item) => {
                // الحصول على الكمية الحالية للمنتج أو تعيينها إلى 0
                const quantity = productQuantities[item.id] || 0;
                const totalPrice = quantity * item.price;
                let favItems = localStorage.getItem("FavInCart")
                    ? JSON.parse(localStorage.getItem("FavInCart"))
                    : [];
                let cartItems = localStorage.getItem("ProductsInCart")
                    ? JSON.parse(localStorage.getItem("ProductsInCart"))
                    : [];
                const selected = favItems.find(p => p.id === item.id );
                const added = cartItems.find(p => p.id === item.id );
                return `
                <div class="product_item">
                    <img class="product_item_img" src="${item.imageUrl}" alt="${item.title}">
                    <div class="product_item_desc">
                        <h2 class="productTitle">${item.title}</h2>
                        <p data-catID="${item.catID}">category: ${item.category}</p>
                        <span>color: ${item.color}</span>
                        <p>Price: ${item.price} ${item.currency}</p>
                    </div>
                    <div class="product_item_action ${added && 'added'}">
                        <div class="product_item_fav ${selected && 'selected'}">
                            <i class="fas fa-heart fav"></i>
                            <i class="fas fa-heart filled"></i>
                        </div>
                        <button class="add_to_cart" onClick="addToCart(${item.id} )" >Add To Cart</button> 
                        <button class="remove_btn"style="width:175px;border-radius:5px;" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                       <input type="hidden" value="${item.id}" />
                    </div>
                </div>
                `;
            });
            allProducts.innerHTML = y.join("");
            const favBtns = document.querySelectorAll(".product_item_fav");
            [].map.call(favBtns , favBtn => {
                favBtn.onclick = e => {
                    let favItems = localStorage.getItem("FavInCart")
                    ? JSON.parse(localStorage.getItem("FavInCart"))
                    : [];
                    const itemID = favBtn.closest(".product_item_action").querySelector("input[type=hidden]").value
                    const product = products.find(p => p.id === parseInt(itemID));
                    if(favBtn.classList.contains('selected')){
                        favBtn.classList.remove('selected')
                        favItems = favItems.filter(item => item.id !== parseInt(itemID));
                        UpdateFav(favItems)
                    }else{
                        favBtn.classList.add('selected')
                        favItems.push({ ...product});
                        UpdateFav(favItems)
                    }
                    
                }
            })
        }
        
        function UpdateFav(favItems) {
            localStorage.setItem("FavInCart", JSON.stringify(favItems));
        }
        
        // bind search click
        let searchInput = document.querySelector('#name-search')
        let searchFilter = document.querySelector('#category-filter')
        let searchBtn = document.querySelector('#search-button')
        searchBtn.onclick = e => {
            let searchKeyword = searchInput.value.toLowerCase();
            let filterValue = searchFilter.options[searchFilter.selectedIndex].id;
            let prodItems = allProducts.querySelectorAll(".product_item");
            [].map.call(prodItems , item => {
                if(item.querySelector("[data-CatID]").getAttribute('data-CatID') !== filterValue && filterValue !== "all" ){
                    item.classList.add('d-none')
                }else{
                    // selectedProds.push(item)
                    item.classList.remove('d-none')
                }
            });

            let selectedProds = allProducts.querySelectorAll(".product_item:not(.d-none)");
            [].map.call(selectedProds , item => {
                const itemName = item.querySelector('.productTitle').innerHTML.toLowerCase();
                if (itemName.includes(searchKeyword)) {
                    item.classList.remove('d-none') // show match
                } else {
                    item.classList.add('d-none')  // hide non-match
                }
            })

             let lastselectedProds = allProducts.querySelectorAll(".product_item:not(.d-none)");
             if(lastselectedProds.length > 0){

//             allProducts.innerText =  '(there is data)'   ;
//   console.log('there is data'); // use console.log instead of duc.log
// ;
console.log('there is data')
             }else{
//  allProducts.innerText = 'there is no Item' ;
//   console.log('there is no Item'); // use console.log instead of duc.log
// ;


console.log('there is no data')
             }
            
                                                        





        }

        // زيادة كمية منتج في الصفحة
        function incrementProductQuantity(id) {
            if (!productQuantities[id]) {
                productQuantities[id] = 0;
            }
            productQuantities[id]++;
            updateProductQuantityDisplay(id);
        }

        // تقليل كمية منتج في الصفحة
        function decrementProductQuantity(id) {
            if (productQuantities[id] && productQuantities[id] > 0) {
                productQuantities[id]--;
                updateProductQuantityDisplay(id);
            }
        }

        // تحديث عرض الكمية والسعر الإجمالي للمنتج
        function updateProductQuantityDisplay(id) {
            const quantityElement = document.getElementById(`productQtty-${id}`);
            const totalElement = document.getElementById(`productTotal-${id}`);
            const product = products.find(p => p.id === id);
            
            if (quantityElement && totalElement && product) {
                const quantity = productQuantities[id] || 0;
                const totalPrice = quantity * product.price;
                
                quantityElement.textContent = quantity;
                
                if (totalPrice > 0) {
                    totalElement.textContent = `Total: ${totalPrice} ${product.currency}`;
                    totalElement.style.display = 'block';
                } else {
                    totalElement.style.display = 'none';
                }
            }
        }

        // تهيئة الصفحة عند التحميل
        document.addEventListener('DOMContentLoaded', function() {
            drawItems();
            renderCart();
        });

        //////////////////////////////////////////////////////////////////////////////////
////////////////  search  /////////////////////////////

          















        //////////////////// السلة///////////////////////////
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

        function removeFromCart(id) {
            // const quantity = productQuantities[id] || 1;
            // let product = addedItem.find((p) => p.id === id);
            
            // let prodQtty = product.Qtty || 1

            addedItem = addedItem.filter((p) => p.id !== id );
            let actionContainer = document.querySelector('input[type=hidden][value="'+ id +'"]').closest('.product_item_action')
            actionContainer.classList.remove('added')
            saveCart();
            renderCart();
        }


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

        //////////////////////////////////////////////////////////////////////////////////
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


        ///////////////////////////////////////////////////////////////






