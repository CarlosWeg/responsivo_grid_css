// Global variables
let currentCategory = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Show default section
    showSection('catalogo');
    
    // Initialize search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobileNav');
    
    btn.classList.toggle('active');
    menu.classList.toggle('active');
}

// Show different sections
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in');
    }
    
    // Update URL hash
    window.location.hash = sectionName;
}

// Filter products by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active category button
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the clicked category
    event.target.classList.add('active');
    
    // Get all product cards
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productGenre = product.getAttribute('data-genre');
        const isRare = product.hasAttribute('data-rare');
        
        let shouldShow = false;
        
        if (category === 'all') {
            shouldShow = true;
        } else if (category === 'rare' && isRare) {
            shouldShow = true;
        } else if (productGenre === category) {
            shouldShow = true;
        }
        
        if (shouldShow) {
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Update grid layout
    updateGridLayout();
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const artist = product.querySelector('.product-artist').textContent.toLowerCase();
        const genre = product.querySelector('.product-genre').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       artist.includes(searchTerm) || 
                       genre.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            product.style.display = 'none';
        }
    });
    
    updateGridLayout();
}

// Update grid layout after filtering
function updateGridLayout() {
    const grid = document.querySelector('.products-grid');
    if (grid) {
        // Force grid recalculation
        grid.style.display = 'none';
        grid.offsetHeight; // Trigger reflow
        grid.style.display = 'grid';
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name') || event.target.querySelector('input[type="text"]').value,
        email: formData.get('email') || event.target.querySelector('input[type="email"]').value,
        subject: formData.get('subject') || event.target.querySelectorAll('input[type="text"]')[1].value,
        message: formData.get('message') || event.target.querySelector('textarea').value
    };
    
    // Simulate form submission
    const button = event.target.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        event.target.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobileNav');
    
    if (!btn.contains(event.target) && !menu.contains(event.target)) {
        btn.classList.remove('active');
        menu.classList.remove('active');
    }
});

// Add to cart animation (placeholder)
document.addEventListener('click', function(event) {
    if (event.target.closest('.product-card')) {
        const card = event.target.closest('.product-card');
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const target = document.getElementById(targetId) || document.getElementById(targetId + '-section');
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && ['catalogo', 'sobre', 'contato'].includes(hash)) {
        showSection(hash);
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Add animation to vinyl records on scroll
function animateVinyls() {
    const vinyls = document.querySelectorAll('.vinyl-record');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });
    
    vinyls.forEach(vinyl => {
        observer.observe(vinyl);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateVinyls);

// Add price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Add shopping cart functionality (basic)
let cart = [];

function addToCart(productId, title, artist, price) {
    const item = {
        id: productId,
        title: title,
        artist: artist,
        price: price,
        quantity: 1
    };
    
    const existingItem = cart.find(cartItem => cartItem.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }
    
    updateCartDisplay();
    showNotification(`${title} adicionado ao carrinho!`);
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart counter in UI if exists
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);