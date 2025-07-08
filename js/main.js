document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE GESTIÓN DE USUARIOS ---
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // --- SELECTORES DE ELEMENTOS ---
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // Sesión y formularios
    const profileContainer = document.getElementById('user-profile-container');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const recoverForm = document.getElementById('recover-form');
    // Barra de búsqueda
    const destinationGroup = document.getElementById('destination-group');
    const destinationDropdown = document.getElementById('destination-dropdown');
    const destinationInput = document.getElementById('destination');
    const tourTypeGroup = document.getElementById('tour-type-group');
    const tourTypeDropdown = document.getElementById('tour-type-dropdown');
    const tourTypeInput = document.getElementById('tour-type');
    // Otros elementos globales
    const header = document.getElementById('main-header');
    const topBanner = document.querySelector('.top-banner') || document.getElementById('top-banner');



    // --- LÓGICA DE INTERFAZ Y MENÚ DE SESIÓN ---
    function closeAllDropdowns(exceptThisOne = null) {
        const allDropdowns = [dropdownMenu, destinationDropdown, tourTypeDropdown];
        allDropdowns.forEach(dropdown => {
            if (dropdown && dropdown !== exceptThisOne && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
    // Menú de usuario
    if (profileContainer) {
        if (isLoggedIn) {
            profileContainer.addEventListener('click', function(event) {
                event.stopPropagation();
                closeAllDropdowns(dropdownMenu);
                if(dropdownMenu) dropdownMenu.classList.toggle('show');
            });
        } else {
            profileContainer.addEventListener('click', function() {
                window.location.href = 'inicio-sesion.html';
            });
        }
    }
    document.addEventListener('click', () => closeAllDropdowns());

    // Dropdowns de búsqueda
    function setupSearchDropdown(group, dropdown, input) {
        if (!group || !dropdown) return;
        group.addEventListener('click', function(event) {
            event.stopPropagation();
            closeAllDropdowns(dropdown);
            dropdown.classList.toggle('show');
        });
        dropdown.addEventListener('click', function(event) {
            if (event.target.classList.contains('dropdown-item')) {
                input.value = event.target.textContent;
                dropdown.classList.remove('show');
            }
        });
    }
    setupSearchDropdown(destinationGroup, destinationDropdown, destinationInput);
    setupSearchDropdown(tourTypeGroup, tourTypeDropdown, tourTypeInput);



    // --- LÓGICA DE FORMULARIOS ---
    // REGISTRO
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                return alert('Las contraseñas no coinciden.');
            }
            const users = getUsers();
            if (users.some(user => user.email === email)) {
                return alert('Este correo electrónico ya está registrado.');
            }
            users.push({ name, email, password });
            saveUsers(users);
            localStorage.setItem('isLoggedIn', 'true');
            alert('¡Cuenta creada con éxito!');
            window.location.href = 'home.html';
        });
    }
    // INICIO DE SESIÓN
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const users = getUsers();
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (foundUser) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'home.html';
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
    // CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'inicio-sesion.html';
        });
    }
    // RECUPERAR CONTRASEÑA
    if (recoverForm) {
        recoverForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Se ha enviado un enlace de recuperación a tu correo.');
            recoverForm.reset();
        });
    }



    // --- FUNCIONALIDADES GENERALES DEL HEADER Y BANNER ---
    const closeBannerBtn = document.querySelector('.close-banner-btn');
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
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

    // --- FORMULARIO DE SUSCRIPCIÓN (CTA) ---
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if(emailInput.value) {
                alert('¡Gracias por suscribirte! Recibirás nuestras mejores recomendaciones.');
                emailInput.value = '';
            } else {
                alert('Por favor, ingresa un correo electrónico.');
            }
        });
    }

    // --- BOTÓN DE FAVORITOS (Página de Detalles) ---
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

    // --- GALERÍA LIGHTBOX (Página de Detalles) ---
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

    // --- RESEÑAS (FILTRO + PAGINACIÓN) ---
    const reviewsContainer = document.querySelector('.reviews-list');
    if (reviewsContainer) {
        const filterRows = document.querySelectorAll('#ratings-filter-container .rating-row');
        const allReviews = Array.from(reviewsContainer.querySelectorAll('.review-card'));
        const paginationNav = document.querySelector('.reviews-page-layout .pagination');
        let currentFilter = 'all';
        const reviewsPerPage = 3;
        function displayReviews(page = 1) {
            const filteredReviews = allReviews.filter(review => {
                if (currentFilter === 'all') return true;
                return review.dataset.rating === currentFilter;
            });
            const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
            paginationNav.style.display = totalPages > 1 ? 'flex' : 'none';
            paginationNav.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.className = 'page-number';
                pageLink.textContent = i;
                if (i === page) pageLink.classList.add('active');
                pageLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    displayReviews(i);
                });
                paginationNav.appendChild(pageLink);
            }
            const start = (page - 1) * reviewsPerPage;
            const end = start + reviewsPerPage;
            allReviews.forEach(review => {
                review.style.display = 'none';
                reviewsContainer.appendChild(review);
            });
            filteredReviews.slice(start, end).forEach(review => {
                review.style.display = 'flex';
            });
        }
        filterRows.forEach(row => {
            row.addEventListener('click', function() {
                filterRows.forEach(r => r.classList.remove('filter-active'));
                this.classList.add('filter-active');
                currentFilter = this.dataset.filter;
                displayReviews(1);
            });
        });
        displayReviews(1);
    }

    // --- VALORACIONES (ESTRELLAS Y RESEÑAS) ---
    const estrellas = document.querySelectorAll('.estrella');
    let calificacion = 0;
    estrellas.forEach((estrella, index) => {
        estrella.addEventListener('mouseover', () => {
            pintarEstrellas(estrellas.length - index);
        });
        estrella.addEventListener('click', () => {
            calificacion = estrellas.length - index;
            pintarEstrellas(calificacion);
        });
        estrella.addEventListener('mouseout', () => {
            pintarEstrellas(calificacion);
        });
    });
    function pintarEstrellas(num) {
        estrellas.forEach((estrella, i) => {
            if (i >= estrellas.length - num) {
                estrella.style.backgroundColor = 'yellow';
            } else {
                estrella.style.backgroundColor = 'black';
            }
        });
    }
    const cancelarBtnVal = document.querySelector('.cancelar');
    if (cancelarBtnVal) {
        cancelarBtnVal.addEventListener('click', () => {
            document.querySelector('.texto').value = '';
            calificacion = 0;
            pintarEstrellas(0);
        });
    }
    const subirBtn = document.querySelector('.subir');
    if (subirBtn) {
        subirBtn.addEventListener('click', () => {
            const texto = document.querySelector('.texto').value.trim();
            if (!calificacion || !texto) {
                alert('Por favor, selecciona una calificación y escribe una reseña.');
                return;
            }
            const hoy = new Date().toLocaleDateString('es-PE');
            const resenas = document.querySelector('.resenas');
            const nuevaResena = document.createElement('div');
            nuevaResena.className = 'valo';
            nuevaResena.innerHTML = `
                <div class="calif">
                  <p>${calificacion}</p>
                  ${crearEstrellasHTML(calificacion)}
                  <p>${hoy}</p>
                </div>
                <p>${texto}</p>
            `;
            const img = document.createElement('img');
            img.className = 'img_per_cal';
            img.src = 'assets/img/perfil.png';
            img.alt = '';
            const contenedor = document.createElement('div');
            contenedor.className = 'resenas';
            contenedor.appendChild(img);
            contenedor.appendChild(nuevaResena);
            document.querySelector('.cont_calificacion').appendChild(contenedor);
            document.querySelector('.texto').value = '';
            calificacion = 0;
            pintarEstrellas(0);
        });
    }
    function crearEstrellasHTML(num) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<div class="${i <= num ? 'estrella_col' : 'estrella_peq'}"></div>`;
        }
        return html;
    }

    // --- COMPARTIR LUGARES (POPUP) ---
    const botonesCompartir = document.querySelectorAll('.compartir');
    const popup = document.getElementById('compartir-popup');
    const emailInputCompartir = document.getElementById('email');
    const cancelarBtnCompartir = document.getElementById('cancelar-compartir');
    const enviarBtnCompartir = document.getElementById('enviar-compartir');
    const lugarTexto = document.getElementById('lugares-seleccionados');
    const lugaresSeleccionados = new Set();
    if (botonesCompartir.length > 0 && popup && emailInputCompartir && cancelarBtnCompartir && enviarBtnCompartir && lugarTexto) {
        botonesCompartir.forEach((boton) => {
            boton.style.cursor = 'pointer';
            boton.addEventListener('click', () => {
                const lugar = boton.parentElement.querySelector('.txt_pre').textContent;
                if (boton.classList.contains('seleccionado')) {
                    boton.classList.remove('seleccionado');
                    lugaresSeleccionados.delete(lugar);
                } else {
                    boton.classList.add('seleccionado');
                    lugaresSeleccionados.add(lugar);
                }
                if (lugaresSeleccionados.size > 0) {
                    lugarTexto.textContent = 'Lugares: ' + Array.from(lugaresSeleccionados).join(', ');
                    popup.classList.remove('oculto');
                } else {
                    popup.classList.add('oculto');
                }
            });
        });
        cancelarBtnCompartir.addEventListener('click', () => {
            lugaresSeleccionados.clear();
            botonesCompartir.forEach(boton => boton.classList.remove('seleccionado'));
            emailInputCompartir.value = '';
            popup.classList.add('oculto');
        });
        enviarBtnCompartir.addEventListener('click', () => {
            const correo = emailInputCompartir.value.trim();
            if (!correo) {
                alert('Por favor ingresa un correo.');
                return;
            }
            const lugares = Array.from(lugaresSeleccionados).join(', ');
            alert(`Lugares compartidos con ${correo}:\n${lugares}`);
            lugaresSeleccionados.clear();
            botonesCompartir.forEach(boton => boton.classList.remove('seleccionado'));
            emailInputCompartir.value = '';
            popup.classList.add('oculto');
        });
    }

    // --- FAQ FILTRO DE BÚSQUEDA ---
    const searchInputFaq = document.querySelector('.barra-busqueda input');
    if (searchInputFaq) {
        searchInputFaq.addEventListener('input', () => {
            const filtro = searchInputFaq.value.toLowerCase();
            const preguntas = document.querySelectorAll('.faq-question1');
            preguntas.forEach((pregunta) => {
                const respuesta = pregunta.nextElementSibling;
                const texto = pregunta.textContent + ' ' + respuesta.textContent;
                const match = texto.toLowerCase().includes(filtro);
                pregunta.style.display = match ? 'block' : 'none';
                respuesta.style.display = match ? 'block' : 'none';
            });
        });
    }

    // --- FORMULARIO DE CONTACTO (VALIDACIÓN) ---
    const form = document.querySelector('.formulario-horizontal');
    if (form) {
        form.addEventListener('submit', (e) => {
            const email = form.querySelector('input[type="email"]').value.trim();
            const consulta = form.querySelector('input[type="text"]').value.trim();
            if (!email || !consulta || !email.includes('@')) {
                e.preventDefault();
                alert('Por favor, completa los campos correctamente.');
            }
        });
    }

});