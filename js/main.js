// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    /**
     * Funcionalidad 1: Cerrar el banner superior
     */
    const topBanner = document.getElementById('top-banner');
    const closeBannerBtn = document.getElementById('close-banner-btn');

    // Si el botón de cierre existe, le añade un evento de clic
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', function() {
            // Oculta el banner al hacer clic
            if (topBanner) {
                topBanner.style.display = 'none';
            }
        });
    }


    /**
     * Funcionalidad 2: Menú desplegable del usuario
     */
    const dropdownContainer = document.getElementById('user-dropdown-container');
    const dropdownMenu = document.getElementById('user-dropdown-menu');

    // Si el contenedor del menú existe, gestiona su visibilidad
    if (dropdownContainer && dropdownMenu) {
        dropdownContainer.addEventListener('click', function(event) {
            // Evita que el clic en el contenedor cierre el menú inmediatamente
            event.stopPropagation(); 
            // Muestra u oculta el menú
            dropdownMenu.classList.toggle('show');
        });

        // Cierra el menú si se hace clic en cualquier otro lugar de la página
        document.addEventListener('click', function() {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }


    /**
     * Funcionalidad 3: Header Fijo (Sticky Header)
     */
    const header = document.getElementById('main-header');
    // Obtiene la altura de la barra de navegación principal
    const navOffsetTop = header ? header.querySelector('.main-nav').offsetTop : 0;

    function handleScroll() {
        if (window.scrollY > navOffsetTop) {
            // Añade la clase 'sticky' si el scroll supera la posición de la nav
            header.classList.add('sticky');
        } else {
            // Quita la clase 'sticky' si el scroll vuelve arriba
            header.classList.remove('sticky');
        }
    }

    // Ejecuta la función handleScroll cada vez que el usuario hace scroll
    if(header) {
       window.addEventListener('scroll', handleScroll);
    }

});