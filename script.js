const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

let savat = [];

// API orqali ma'lumotlarni olish (async/await yordamida)
async function getProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();
        
        // Videodagidek 10 ta mahsulotni olamiz
        let tenProducts = products.slice(0, 10);
        showProducts(tenProducts);
    } catch (error) {
        console.log("Xatolik:", error);
    }
}

// Ekranga chiqarish (nomi, info/description, narxi va tugmasi bilan)
function showProducts(items) {
    productsContainer.innerHTML = '';
    
    items.forEach(product => {
        let card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="">
            <h3>${product.title}</h3>
            <p class="description">${product.description}</p>
            <div class="price-row">
                <span class="price">$${product.price}</span>
                <button onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price})">Sotib olish</button>
            </div>
        `;
        
        productsContainer.appendChild(card);
    });
}

// Savatga qo'shish
function addToCart(id, title, price) {
    savat.push({ id, title, price });
    renderCart();
}

// Savatni yangilash va umumiy summani chiqarish
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    savat.forEach(item => {
        total += item.price;
        
        let div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.title}</span>
            <span>$${item.price}</span>
        `;
        cartItemsContainer.appendChild(div);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Funksiyani ishga tushiramiz
getProducts();