const cartContainer = document.getElementById('cartContainer');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="pt-14 text-center text-3xl font-semibold text-[var(--heading-color)] dark:text-[var(--heading-color)]">Your cart is empty.</p>';
        return;
    }

    cartContainer.innerHTML = '<h2 class="text-3xl font-bold mb-6 text-[var(--heading-color)] dark:text-[var(--heading-color)]">Your Cart</h2>';

    cart.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'flex items-center gap-6 mb-6 p-4 rounded shadow bg-[var(--background-2-light-color)] dark:bg-[var(--background-2-light-color)]';

        productDiv.innerHTML = `
      <img src="${product.image && product.image !== 'image' ? product.image : 'https://via.placeholder.com/80'}" alt="${product.name}" class="w-20 h-20 object-cover rounded" />
      <div class="flex-1">
        <h3 class="font-semibold text-lg text-[var(--heading-color)] dark:text-[var(--heading-color)]">${product.name}</h3>
        <p class="text-gray-700 dark:text-gray-300 text-[var(--p-color)] dark:text-[var(--p-color)]">${product.description}</p>
        <p class="font-bold mt-1 text-yellow-600 dark:text-yellow-400">$${product.price}</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Quantity: ${product.quantity || 1}</p>
      </div>
      <button data-index="${index}" class="delete-btn bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 font-semibold transition">
        Delete
      </button>
    `;

        cartContainer.appendChild(productDiv);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            const product = cart[idx];
            if (confirm(`Are you sure to delete ${product.name} from cart?`)) {
                cart.splice(idx, 1); // Remove item from cart array
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                renderCart(); // Re-render cart
            }
        });
    });
}

renderCart();
