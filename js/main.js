document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE INICIO DE SESIÓN Y MENÚ DE USUARIO ---
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const profileContainer = document.getElementById('user-profile-container');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const signupForm = document.getElementById('signup-form');
    const recoverForm = document.getElementById('recover-form');

    if (profileContainer) {
        if (isLoggedIn) {
            // **COMPORTAMIENTO SI LA SESIÓN ESTÁ INICIADA**
            profileContainer.addEventListener('click', function(event) {
                event.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
        } else {
            // **COMPORTAMIENTO SI LA SESIÓN NO ESTÁ INICIADA**
            profileContainer.addEventListener('click', function() {
                // Redirige a la página de inicio de sesión
                window.location.href = 'inicio-sesion.html';
            });
        }
    }

    // Event listener para el botón de INICIAR SESIÓN
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Esto solo se ejecuta si los campos 'required' están llenos
            event.preventDefault(); // Previene la recarga de la página
            
            // Simula el inicio de sesión
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirige al home
            window.location.href = 'home.html';
        });
    }

    // Event listener para el botón de CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            // Simula el cierre de sesión
            localStorage.setItem('isLoggedIn', 'false');
            // Redirige a la página de inicio de sesión
            window.location.href = 'inicio-sesion.html';
        });
    }

    // Cierra el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', function() {
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Event listener para el formulario de CREAR CUENTA
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            // Esto solo se ejecuta si los campos 'required' están llenos
            event.preventDefault(); // Previene la recarga de la página

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validación extra: verificar que las contraseñas coinciden
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
                return; // Detiene la ejecución si no coinciden
            }

            // Simula la creación de cuenta e inicio de sesión
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirige al home
            window.location.href = 'home.html';
        });
    }

    // Event listener para el formulario de RECUPERAR CONTRASEÑA
    if (recoverForm) {
        recoverForm.addEventListener('submit', function(event) {
            // Esto solo se ejecuta si el campo de email está lleno y es válido
            event.preventDefault(); // Previene la recarga de la página
            
            // Muestra el mensaje de confirmación
            alert('Se ha enviado un enlace de recuperación a tu correo.');
            
        });
    }

    // --- OTRAS FUNCIONALIDADES GENERALES ---

    // Funcionalidad para cerrar el banner superior
    const topBanner = document.getElementById('top-banner');
    const closeBannerBtn = document.querySelector('.close-banner-btn');
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
    }

    // Funcionalidad para el Header Fijo (Sticky Header)
    const header = document.getElementById('main-header');
    if (header) {
        // Se apunta a '.main-nav' dentro del header para calcular el offset
        const navElement = header.querySelector('.main-nav');
        const navOffsetTop = navElement ? navElement.offsetTop : 0;

        window.addEventListener('scroll', () => {
            // En lugar de añadir 'sticky' a todo el header, se lo añadimos a la barra de navegación
            // para que el top-banner no se quede pegado.
            if (window.scrollY > navOffsetTop) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // =========================================================================
    // --- NUEVA LÓGICA COMBINADA DE BÚSQUEDA Y PAGINACIÓN ---
    // =========================================================================
    const searchInput = document.getElementById('search-input');
    const paginationContainer = document.querySelector('.pagination');
    const siteCards = document.querySelectorAll('.site-card');

    // Solo se activa si hay tarjetas de sitios en la página
    if (siteCards.length > 0) {
        const itemsPerPage = 6;
        const pageLinks = paginationContainer ? document.querySelectorAll('.pagination .page-number') : [];

        // --- FUNCIÓN DE PAGINACIÓN (Reutilizable) ---
        const showPage = (pageNumber) => {
            const start = (pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            siteCards.forEach((card, index) => {
                // Muestra la tarjeta si su índice está en el rango de la página actual
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

        // --- LÓGICA DE PAGINACIÓN INICIAL ---
        if (paginationContainer) {
            pageLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const pageNumber = parseInt(link.textContent);
                    showPage(pageNumber);
                });
            });
            // Carga inicial de la primera página
            showPage(1);
        }

        // --- LÓGICA DEL BUSCADOR (Modificada) ---
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase().trim();

                // Si hay texto en el buscador...
                if (searchTerm) {
                    // Oculta la paginación
                    if (paginationContainer) paginationContainer.style.display = 'none';

                    // Muestra solo las tarjetas que coinciden
                    siteCards.forEach(card => {
                        const title = card.querySelector('.card-title').textContent.toLowerCase();
                        card.style.display = title.includes(searchTerm) ? 'flex' : 'none';
                    });
                } else {
                    // Si el buscador está vacío...
                    // Muestra la paginación de nuevo
                    if (paginationContainer) paginationContainer.style.display = 'flex';
                    // Y resetea la vista a la primera página
                    showPage(1);
                }
            });
        }
    }
});

