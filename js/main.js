// Burger Menu
document.querySelector('.burger-menu').onclick = () => {
    document.querySelector('nav').classList.toggle('active');
};

// Dark Theme
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme === 'dark') {
        root.classList.add('dark')
        toggleBtn.classList.replace('fa-moon', 'fa-sun')
    }
}

toggleBtn.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark')

    toggleBtn.classList.toggle('fa-moon', !isDark)
    toggleBtn.classList.toggle('fa-sun', isDark)

    localStorage.setItem('theme', isDark ? 'dark' : 'light')
})

window.addEventListener('DOMContentLoaded', applySavedTheme)