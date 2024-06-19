document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products');
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-title">${product.title}</div>
                    <div class="product-price">$${product.price}</div>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Failed to load products.</p>';
        });
});

