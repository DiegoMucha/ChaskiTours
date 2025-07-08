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

    // --- FUNCIONALIDAD PARA FORMULARIO DE SUSCRIPCIÓN (CTA) ---
    const ctaForm = document.querySelector('.cta-form');

    if (ctaForm) {
        ctaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene que la página se recargue
            const emailInput = this.querySelector('input[type="email"]');
            
            if(emailInput.value) {
                alert('¡Gracias por suscribirte! Recibirás nuestras mejores recomendaciones.');
                emailInput.value = ''; // Limpia el campo de correo
            } else {
                alert('Por favor, ingresa un correo electrónico.');
            }
        });
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

          // --- LÓGICA PARA PÁGINA DE RESEÑAS (FILTRO + PAGINACIÓN) ---
          const reviewsContainer = document.querySelector('.reviews-list');
    
          if (reviewsContainer) {
              const filterRows = document.querySelectorAll('#ratings-filter-container .rating-row');
              const allReviews = Array.from(reviewsContainer.querySelectorAll('.review-card'));
              const paginationNav = document.querySelector('.reviews-page-layout .pagination');
              let currentFilter = 'all';
              const reviewsPerPage = 3; // ¿Cuántas reseñas quieres por página?
      
              // Función principal que dibuja las reseñas
              function displayReviews(page = 1) {
                  // 1. Filtrar las reseñas según el filtro actual
                  const filteredReviews = allReviews.filter(review => {
                      if (currentFilter === 'all') return true;
                      return review.dataset.rating === currentFilter;
                  });
      
                  // 2. Ocultar o mostrar paginación
                  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
                  paginationNav.style.display = totalPages > 1 ? 'flex' : 'none';
      
                  // 3. Crear y actualizar botones de paginación
                  paginationNav.innerHTML = ''; // Limpiar paginación anterior
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
      
                  // 4. Mostrar solo las reseñas de la página actual
                  const start = (page - 1) * reviewsPerPage;
                  const end = start + reviewsPerPage;
                  
                  // Primero, poner todas las tarjetas en el contenedor (pero ocultas)
                  allReviews.forEach(review => {
                      review.style.display = 'none';
                      reviewsContainer.appendChild(review); // Asegura que estén todas en el DOM
                  });
      
                  // Luego, mostrar solo las que corresponden a la página y filtro actual
                  filteredReviews.slice(start, end).forEach(review => {
                      review.style.display = 'flex';
                  });
              }
      
              // Añadir evento de clic a las filas de filtro
              filterRows.forEach(row => {
                  row.addEventListener('click', function() {
                      // Actualizar el filtro activo visualmente
                      filterRows.forEach(r => r.classList.remove('filter-active'));
                      this.classList.add('filter-active');
                      
                      // Cambiar el filtro actual y volver a dibujar desde la página 1
                      currentFilter = this.dataset.filter;
                      displayReviews(1);
                  });
              });
      
              // Carga inicial al entrar a la página
              displayReviews(1);
          }

          // valoraciones
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


// Botón Cancelar
document.querySelector('.cancelar').addEventListener('click', () => {
  document.querySelector('.texto').value = '';
  calificacion = 0;
  pintarEstrellas(0);
});

// Botón Subir (simula guardar la reseña)
document.querySelector('.subir').addEventListener('click', () => {
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

  // Limpiar
  document.querySelector('.texto').value = '';
  calificacion = 0;
  pintarEstrellas(0);
});

function crearEstrellasHTML(num) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<div class="${i <= num ? 'estrella_col' : 'estrella_peq'}"></div>`;
  }
  return html;
}

//preguntas frecuentes

}); 

const searchInput = document.querySelector('.barra-busqueda input');

searchInput.addEventListener('input', () => {
  const filtro = searchInput.value.toLowerCase();
  const preguntas = document.querySelectorAll('.faq-question1');

  preguntas.forEach((pregunta) => {
    const respuesta = pregunta.nextElementSibling;
    const texto = pregunta.textContent + ' ' + respuesta.textContent;
    const match = texto.toLowerCase().includes(filtro);
    pregunta.style.display = match ? 'block' : 'none';
    respuesta.style.display = match ? 'block' : 'none';
  });
});

const form = document.querySelector('.formulario-horizontal');

form.addEventListener('submit', (e) => {
  const email = form.querySelector('input[type="email"]').value.trim();
  const consulta = form.querySelector('input[type="text"]').value.trim();

  if (!email || !consulta || !email.includes('@')) {
    e.preventDefault();
    alert('Por favor, completa los campos correctamente.');
  }
});

