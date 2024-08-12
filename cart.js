function displayToCart(){
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    let productsContainer = document.querySelector('.items-body');
    let cartTotalCost = 0;

        cartTotalCost = productsInCart.reduce((total,curr)=>{
            return total += Number(curr?.totalPrice);
        },0);

    if(productsInCart && productsContainer)
    {
        productsContainer.innerHTML = '';
        Object.values(productsInCart).map(productItem => {
            productsContainer.innerHTML += `
            <div class = 'item'>
                <i class="fa fa-times remove" data-tag="${productItem.id}"></i>
                <img src='${productItem.image}'>
                <span>${productItem.title}</span>
            </div>
            <div class= 'price'>
                $${productItem.price}.00
            </div>
            <div class='quantity'>
                <i class="fa fa-caret-left decrease" data-tag="${productItem.id}"></i>
                    <span>${productItem.quantity}</span>
                <i class="fa fa-caret-right increase" data-tag="${productItem.id}"></i>
            </div>
            <div class='total'>$${productItem.totalPrice}</div>
            `
        });
        productsContainer.innerHTML +=`
            <div class="basketTotalContainer">
             <h4 class="basketTitle">Basket Total</h4>
             <h4 class="basketTotal">$${cartTotalCost}</h4>
            </div>
            `;
    eventListeners();
    }

}

function onLoadCart(){
    let itemCountDisplay = document.querySelector('.cartLogo');
    count = 0;
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));

    if(productsInCart){
        count = productsInCart?.length;
    }
    itemCountDisplay.textContent = count;
}

function eventListeners(){
    const removeButton = document.querySelectorAll('.remove');
    const increaseButton = document.querySelectorAll('.increase');
    const decreaseButton = document.querySelectorAll('.decrease');

    increaseButton.forEach((button) => {
        button.addEventListener('click', () => {
            const tag = button.getAttribute('data-tag');
            updateCart(tag,'increase');
        });
    });

    decreaseButton.forEach((button) => {
        button.addEventListener('click',() => {
            const tag = button.getAttribute('data-tag');
            updateCart(tag, 'decrease');
        });
    });

    removeButton.forEach((button) =>{
        button.addEventListener('click', ()=>{
            const tag = button.getAttribute('data-tag');
            removeCart(tag);
        })
    })
}

window.addEventListener('addToCart', ()=>{
displayToCart();
onLoadCart();
});

function updateCart(tag,action){
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    newCartItem = [...productsInCart];
    // console.log(newCartItem);

    let findIndex = newCartItem.findIndex(item => item?.id === tag);
    let currentInCart = newCartItem[findIndex];
    let currentQuantity = currentInCart?.quantity;

    //if there is no product in cart
    if( action === 'increase'){
        currentQuantity ++;
        currentInCart.quantity = currentQuantity;
        currentInCart.totalPrice = currentInCart.price * currentQuantity;
    }

    else{//if there is product in cart
        if(currentQuantity === 1){
            removeCart(tag);
            return;
        }
        currentQuantity --;
        currentInCart.quantity = currentQuantity;
        currentInCart.totalPrice = currentInCart.price * currentQuantity;
        }

        localStorage.setItem('productsInCart', JSON.stringify(newCartItem));
        let event = new Event("addToCart");
        window.dispatchEvent(event);
}

function removeCart(tag){
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
    let newCartItem = [...productsInCart];

    let findIndex = newCartItem.findIndex((item)=>item?.id === tag);
    newCartItem.splice(findIndex, 1);
    localStorage.setItem('productsInCart', JSON.stringify(newCartItem));
    let event = new Event("addToCart");
    window.dispatchEvent(event);

displayToCart();
onLoadCart();
}


displayToCart();
onLoadCart();




























// function totalCost(){
//     let cartCost = localStorage.getItem('totalCost');

//     if(cartCost != null){
//         cattCost = localStorage.setItem
//     }
// }

// function displayToCart(){
//     let cartItems = localStorage.getItem('cart') || [];
//      cartItems = JSON.parse(cartItems);
   
//     let itemContainer = document.querySelector('.items-body');
//     if(cartItems && itemContainer){
//     Object.values(cartItems).map(productItem => {
//             console.log(productItem);
//             itemContainer.innerHTML +=` 
//             <div class="item">
//                 <i class="fa fa-times"></i>
//                 <img src="${productItem.image}" alt="${productItem.title}">
//                 <span>${productItem.title}</span>
//             </div>
//             <div class="price">$${productItem.price}.00</div>
//             <div class="quantity">
//                 <i class="fa fa-caret-left"></i>
//                 <span>${productItem.quantity}</span>
//                 <i class="fa fa-caret-right" ></i>
//             </div>
//             <div class="total">
//                 $${productItem.price * productItem.quantity}.00
//             </div>
//             `
//     });

// }
// }

// displayToCart();