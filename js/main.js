document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMENTOS GLOBALES Y ESTADO ---
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const profileContainer = document.getElementById('user-profile-container');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const header = document.getElementById('main-header');
    const topBanner = document.getElementById('top-banner');

    // --- LÓGICA DE SESIÓN Y MENÚ ---
    if (profileContainer) {
        if (isLoggedIn) {
            profileContainer.addEventListener('click', (event) => {
                event.stopPropagation();
                if(dropdownMenu) dropdownMenu.classList.toggle('show');
            });
        } else {
            profileContainer.addEventListener('click', () => {
                window.location.href = 'inicio-sesion.html';
            });
        }
    }
    document.addEventListener('click', () => {
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // --- LÓGICA DE FORMULARIOS ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) { loginForm.addEventListener('submit', e => { e.preventDefault(); localStorage.setItem('isLoggedIn', 'true'); window.location.href = 'home.html'; });}
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) { logoutBtn.addEventListener('click', e => { e.preventDefault(); localStorage.setItem('isLoggedIn', 'false'); window.location.href = 'inicio-sesion.html'; });}

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'home.html';
        });
    }
    
    const recoverForm = document.getElementById('recover-form');
    if(recoverForm){
        recoverForm.addEventListener('submit', function(event){
            event.preventDefault();
            alert('Se ha enviado un enlace de recuperación a tu correo.');
        });
    }

    // --- FUNCIONALIDADES GENERALES DEL HEADER ---
    if (topBanner) {
        const closeBannerBtn = topBanner.querySelector('.close-banner-btn');
        if(closeBannerBtn) closeBannerBtn.addEventListener('click', () => topBanner.style.display = 'none');
    }
    if (header) {
        const navElement = header.querySelector('.main-nav');
        if(navElement) {
            const navOffsetTop = navElement.offsetTop;
            window.addEventListener('scroll', () => {
                header.classList.toggle('sticky', window.scrollY > navOffsetTop);
            });
        }
    }

    // --- LÓGICA DE BÚSQUEDA Y PAGINACIÓN (Página de Sitios) ---
    const searchInput = document.getElementById('search-input');
    const siteCards = document.querySelectorAll('.site-card');

    if (siteCards.length > 0) {
        const paginationContainer = document.querySelector('.pagination');
        const itemsPerPage = 6;
        const pageLinks = paginationContainer ? document.querySelectorAll('.pagination .page-number') : [];

        const showPage = (pageNumber) => {
            const start = (pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            siteCards.forEach((card, index) => {
                card.style.display = (index >= start && index < end) ? 'flex' : 'none';
            });
            if (pageLinks.length > 0) {
                pageLinks.forEach(link => {
                    link.classList.remove('active');
                    if (parseInt(link.textContent) === pageNumber) {
                        link.classList.add('active');
                    }
                });
            }
        };

        if (paginationContainer) {
            pageLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    showPage(parseInt(link.textContent));
                });
            });
            showPage(1);
        }

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase().trim();
                if (searchTerm) {
                    if (paginationContainer) paginationContainer.style.display = 'none';
                    siteCards.forEach(card => {
                        const title = card.querySelector('.card-title').textContent.toLowerCase();
                        card.style.display = title.includes(searchTerm) ? 'flex' : 'none';
                    });
                } else {
                    if (paginationContainer) paginationContainer.style.display = 'flex';
                    showPage(1);
                }
            });
        }
    }
    
    // --- FUNCIONALIDAD PARA BOTÓN DE FAVORITOS (Página de Detalles) ---
    const btnFavorito = document.getElementById('btn-favorito');
    if (btnFavorito) {
        btnFavorito.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.textContent = '❤️ Guardado';
                this.style.backgroundColor = 'var(--primary-dark)';
                this.style.color = 'var(--text-light)';
            } else {
                this.textContent = '❤️ Guardar como favorito';
                this.style.backgroundColor = 'transparent';
                this.style.color = 'var(--primary-dark)';
            }
        });
    }

    // --- FUNCIONALIDAD PARA GALERÍA LIGHTBOX (Página de Detalles) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        const lightboxImage = document.createElement('img');
        lightboxImage.className = 'lightbox-content';
        lightbox.appendChild(lightboxImage);

        const lightboxClose = document.createElement('span');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';
        lightbox.appendChild(lightboxClose);

        galleryItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                lightboxImage.src = this.href;
                lightbox.classList.add('show');
            });
        });

        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox || event.target === lightboxClose) {
                lightbox.classList.remove('show');
            }
        });
    }

}); 