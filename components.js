/**
 * Component Injection for Cache Cow Snow Plows
 * Replaces placeholders with common Header and Footer content.
 */

const HeaderComponent = `
    <div class="container">
        <nav>
            <div class="logo">
                <a href="index.html" style="text-decoration:none; color:inherit; display:flex; gap:0.5rem; align-items:center;">
                    <img src="assets/images/icon_snowflake.png" alt="Cow Logo" style="height: 32px; width: 32px; border-radius: 5px;"> 
                    Cache Cows Snow Plows
                </a>
            </div>
            <div class="burger">☰</div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="quote.html" class="btn btn-secondary">Get a Quote</a></li>
            </ul>
        </nav>
    </div>
`;

const FooterComponent = `
    <div class="container">
        <p>&copy; 2026 Cache Cow Snow Plows. Serving Logan, UT and surrounding areas.</p>
    </div>
`;

function injectComponents() {
    const headerPlaceholder = document.querySelector('header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HeaderComponent;

        // Re-attach active class logic based on current URL
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = headerPlaceholder.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                if (link.classList.contains('btn')) {
                    link.classList.remove('btn-secondary');
                    link.classList.add('btn');
                    link.style.background = 'var(--accent)';
                    link.style.color = 'var(--primary)';
                }
            }
        });

        // Mobile Nav Toggle Logic
        const burger = headerPlaceholder.querySelector('.burger');
        const nav = headerPlaceholder.querySelector('.nav-links');

        console.log('Mobile Nav Init:', { burger: !!burger, nav: !!nav }); // Debug

        if (burger && nav) {
            burger.addEventListener('click', (e) => {
                console.log('Burger clicked'); // Debug
                e.stopPropagation(); // Prevent bubbling issues
                nav.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
                    nav.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            });
        }
    }

    const footerPlaceholder = document.querySelector('footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = FooterComponent;
    }
}

document.addEventListener('DOMContentLoaded', injectComponents);
