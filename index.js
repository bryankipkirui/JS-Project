function showProductDetails(productId) {

    let url = `https://fakestoreapi.com/products/${productId}`;
    fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(product =>{
            console.log(product);
            const modal = document.createElement('div');//creating  div element
            modal.classList.add('modal');//adding a css element 'modal' to the the div element div
            modal.id = 'modal';// assigning an id to the div element
            modal.innerHTML = `
                <div class= "modal-content">
                    <span class="close-button">&times;</span>
                    <img src="${product.image}" alt="${product.title}" height="100px" width="100px">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                </div>
            `;

            document.body.appendChild(modal);

            modal.style.display = 'block';


            //add event listeners used to close the modal
            const closeButton = document.querySelector('.close-button');
            closeButton.addEventListener('click', ()=>{
                document.body.removeChild(modal);
            });

            //addeventlistener to close the modal when clicking outside model content
            modal.addEventListener('click',(event)=>{
                if(event.target === modal){
                    document.body.removeChild(modal);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching product details: ', error);
        });
}







document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json()) 
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                // console.log(products);
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-title">${product.title}</div>
                    <div class="product-price">$${product.price}</div>
                <button onclick="showProductDetails(${product.id})">View details</button>
                <button onclick="addToCart('${product.image}','${product.title}','${product.id}','${product.price}')" class="btn">Add to Cart</button>
                `;
                productsContainer.appendChild(productElement);
            });
            onLoadCart();
        })
        .catch(error => {
            console.error('Error fetching products: ', error);
            productsContainer.innerHTML = '<p>Failed to load products.</p>';
        });
});


function addToCart(productImage,title,productId,price)
{
    //if there is no product in cart
    let cartArray = [];
    let productsInCart = localStorage.getItem('productsInCart');

    if(!productsInCart){
        cartArray.push({
            image: productImage,
            title: title, 
            id: productId, 
            price: price,
            quantity: 1,
            totalPrice: price
        });
        localStorage.setItem('productsInCart', JSON.stringify(cartArray));
    }
    //if there is product in cart push a new item into cart
    else{
        let existingCart = JSON.parse(productsInCart);
        let newExistingCart = [...existingCart];
        let findIndex = newExistingCart.findIndex(item => item.id === productId);

         if(findIndex === -1){
            newExistingCart.push({
                image: productImage,
                title: title, 
                id: productId, 
                price: price,
                quantity: 1,
                totalPrice: price
            });
         }
         else{//if products is already in cart
            let existingProduct = newExistingCart[findIndex];
            existingProduct.quantity++;
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
         }
         localStorage.setItem('productsInCart', JSON.stringify(newExistingCart));
    }

onLoadCart();
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

