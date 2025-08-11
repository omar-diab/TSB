const productsGrid = document.getElementById('productsGrid');

let currentPage = 1;
const itemsPerPage = 3;

const products = [
    {
        "id": "1",
        "name": "Margherita Pizza",
        "category": "Pizza",
        "description": "Classic pizza with fresh mozzarella, basil, and tomato sauce.",
        "price": 12.99,
        "image": "/images/foods/pexels-renestrgar-20882533.jpg",
        "availability": true
    },
    {
        "id": "2",
        "name": "Spaghetti Carbonara",
        "category": "Pasta",
        "description": "Spaghetti with pancetta, egg, Parmesan cheese, and black pepper.",
        "price": 14.5,
        "image": "/images/foods/pexels-polina-tankilevitch-4518844.jpg",
        "availability": true
    },
    {
        "id": "3",
        "name": "Caesar Salad",
        "category": "Salads",
        "description": "Crisp romaine lettuce, Caesar dressing, croutons, and Parmesan cheese.",
        "price": 8.99,
        "image": "/images/foods/pexels-julieaagaard-2097090.jpg",
        "availability": true
    },
    {
        "id": "4",
        "name": "Grilled Chicken Sandwich",
        "category": "Sandwiches",
        "description": "Grilled chicken breast with lettuce, tomato, and mayo on a toasted bun.",
        "price": 10.75,
        "image": "/images/foods/pexels-the-castlebar-3902897-29177425.jpg",
        "availability": true
    },
    {
        "id": "5",
        "name": "French Fries",
        "category": "Sides",
        "description": "Golden crispy French fries served with ketchup.",
        "price": 4.25,
        "image": "/images/foods/pexels-valeriya-1893555.jpg",
        "availability": true
    },
    {
        "id": "6",
        "name": "Chocolate Lava Cake",
        "category": "Desserts",
        "description": "Warm chocolate cake with a molten chocolate center.",
        "price": 6.5,
        "image": "/images/foods/pexels-valeriya-14457510.jpg",
        "availability": true
    },
    {
        "id": "7",
        "name": "Minestrone Soup",
        "category": "Soups",
        "description": "Hearty vegetable soup with beans, pasta, and herbs.",
        "price": 7.0,
        "image": "/images/foods/pexels-she-eats-663643-13788765.jpg",
        "availability": false
    },
    {
        "id": "8",
        "name": "Tiramisu",
        "category": "Desserts",
        "description": "Classic Italian dessert with mascarpone, coffee, and cocoa powder.",
        "price": 6.75,
        "image": "/images/foods/pexels-quang-nguyen-vinh-222549-2138849.jpg",
        "availability": true
    },
    {
        "id": "9",
        "name": "Caprese Salad",
        "category": "Salads",
        "description": "Fresh tomatoes, mozzarella, basil, and balsamic glaze.",
        "price": 9.5,
        "image": "/images/foods/pexels-gabriel-lima-865460-15735983.jpg",
        "availability": true
    },
    {
        "id": "10",
        "name": "BBQ Ribs",
        "category": "Main Course",
        "description": "Slow-cooked pork ribs with smoky BBQ sauce.",
        "price": 18.99,
        "image": "/images/foods/pexels-nadin-sh-78971847-23744962.jpg",
        "availability": true
    }
]
// Helper: get cart from localStorage or empty array
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Helper: save cart back to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProductsPage(page) {
    productsGrid.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach((product) => {
        const card = document.createElement("article");
        card.className =
            "bg-[var(--background-2-light-color)] dark:bg-[var(--background-2-light-color)] rounded-xl shadow-lg overflow-hidden flex flex-col";

        const img = document.createElement("img");
        img.src =
            product.image && product.image !== "image"
                ? product.image
                : "https://via.placeholder.com/400x250?text=No+Image";
        img.alt = product.name;
        img.className = "w-full h-52 object-cove";

        const content = document.createElement("div");
        content.className = "p-6 flex flex-col flex-grow";

        const name = document.createElement("h2");
        name.className =
            "text-xl font-semibold mb-2 text-[var(--heading-color)] dark:text-[var(--heading-color)]";
        name.textContent = product.name;

        const desc = document.createElement("p");
        desc.className = "text-[var(--p-color)] dark:text-[var(--p-color)] flex-grow";
        desc.textContent = product.description;

        const price = document.createElement("p");
        price.className =
            "mt-4 font-bold text-[var(--primary-color)] dark:text-[var(--primary-color)] text-lg";
        price.textContent = `$${product.price}`;

        // Buy button
        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Buy";
        buyBtn.className =
            "mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-5 rounded shadow transition";
        buyBtn.onclick = () => {
            const cart = getCart();

            const existingProductIndex = cart.findIndex(
                (item) => item.id === product.id
            );
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            saveCart(cart);

            alert(`Are you sure to add ${product.name} to cart`);
        };

        content.append(name, desc, price, buyBtn);
        card.append(img, content);
        productsGrid.appendChild(card);
    });
}

function renderPaginationControls() {
    const paginationDivId = "paginationControls";
    let paginationDiv = document.getElementById(paginationDivId);

    if (!paginationDiv) {
        paginationDiv = document.createElement("div");
        paginationDiv.id = paginationDivId;
        paginationDiv.className = "flex justify-center gap-4 mt-8";
        productsGrid.parentNode.appendChild(paginationDiv);
    }
    paginationDiv.innerHTML = "";

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = `px-4 py-2 rounded ${prevBtn.disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-900 font-semibold"
        }`;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProductsPage(currentPage);
            renderPaginationControls();
        }
    };

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = `px-4 py-2 rounded ${nextBtn.disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-gray-900 font-semibold"
        }`;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProductsPage(currentPage);
            renderPaginationControls();
        }
    };

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pageInfo.className = "text-gray-700 dark:text-gray-300 self-center";

    paginationDiv.append(prevBtn, pageInfo, nextBtn);
}

// Instead of fetch, just render the first page immediately
function init() {
    if (products.length === 0) {
        productsGrid.innerHTML = `<p class="text-center col-span-full text-gray-500 dark:text-gray-400">No products found.</p>`;
        return;
    }

    currentPage = 1;
    renderProductsPage(currentPage);
    renderPaginationControls();
}

init();
