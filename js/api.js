const productsGrid = document.getElementById('productsGrid');
const apiUrl = 'https://68992888ddf05523e5609743.mockapi.io/api/foods/products';

let currentPage = 1;
const itemsPerPage = 3;
let products = [];

// Helper: get cart from localStorage or empty array
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Helper: save cart back to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProductsPage(page) {
    productsGrid.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach(product => {
        const card = document.createElement('article');
        card.className = `bg-[var(--background-2-light-color)] dark:bg-[var(--background-2-light-color)] rounded-xl shadow-lg overflow-hidden flex flex-col`;

        const img = document.createElement('img');
        img.src = product.image && product.image !== 'image' ? product.image : 'https://via.placeholder.com/400x250?text=No+Image';
        img.alt = product.name;
        img.className = 'w-full h-48 object-cover';

        const content = document.createElement('div');
        content.className = 'p-6 flex flex-col flex-grow';

        const name = document.createElement('h2');
        name.className = 'text-xl font-semibold mb-2 text-[var(--heading-color)] dark:text-[var(--heading-color)]';
        name.textContent = product.name;

        const desc = document.createElement('p');
        desc.className = 'text-[var(--p-color)] dark:text-[var(--p-color)] flex-grow';
        desc.textContent = product.description;

        const price = document.createElement('p');
        price.className = 'mt-4 font-bold text-[var(--primary-color)] dark:text-[var(--primary-color)] text-lg';
        price.textContent = `$${product.price}`;

        // Buy button
        const buyBtn = document.createElement('button');
        buyBtn.textContent = 'Buy';
        buyBtn.className = 'mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-5 rounded shadow transition';
        buyBtn.onclick = () => {
            // Get current cart
            const cart = getCart();

            // Check if product is already in cart
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                // If exists, increment quantity
                cart[existingProductIndex].quantity += 1;
            } else {
                // Else add new product with quantity 1
                cart.push({ ...product, quantity: 1 });
            }

            // Save back to localStorage
            saveCart(cart);

            alert(`Are you sure to add ${product.name} to cart`);
        };

        content.append(name, desc, price, buyBtn);
        card.append(img, content);
        productsGrid.appendChild(card);
    });
}

function renderPaginationControls() {
    const paginationDivId = 'paginationControls';
    let paginationDiv = document.getElementById(paginationDivId);

    if (!paginationDiv) {
        paginationDiv = document.createElement('div');
        paginationDiv.id = paginationDivId;
        paginationDiv.className = 'flex justify-center gap-4 mt-8';
        productsGrid.parentNode.appendChild(paginationDiv);
    }
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = `px-4 py-2 rounded ${
        prevBtn.disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-900 font-semibold'
    }`;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProductsPage(currentPage);
            renderPaginationControls();
        }
    };

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = `px-4 py-2 rounded ${
        nextBtn.disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-900 font-semibold'
    }`;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProductsPage(currentPage);
            renderPaginationControls();
        }
    };

    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pageInfo.className = 'text-gray-700 dark:text-gray-300 self-center';

    paginationDiv.append(prevBtn, pageInfo, nextBtn);
}

async function fetchProducts() {
    productsGrid.innerHTML = `<p class="text-center col-span-full text-gray-500 dark:text-gray-400">Loading products...</p>`;
    try {
        const res = await fetch(apiUrl);
        products = await res.json();

        if (!Array.isArray(products) || products.length === 0) {
            productsGrid.innerHTML = `<p class="text-center col-span-full text-gray-500 dark:text-gray-400">No products found.</p>`;
            return;
        }

        currentPage = 1;
        renderProductsPage(currentPage);
        renderPaginationControls();
    } catch (error) {
        productsGrid.innerHTML = `<p class="text-center col-span-full text-red-600 dark:text-red-400">Failed to load products: ${error.message}</p>`;
    }
}

fetchProducts();
