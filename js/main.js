document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE INICIO DE SESIÓN ---

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

    if (recoverForm) {
    recoverForm.addEventListener('submit', function(event) {
        // Esto solo se ejecuta si el campo de email está lleno y es válido
        event.preventDefault(); // Previene la recarga de la página
        
        // Muestra el mensaje de confirmación
        alert('Se ha enviado un enlace de recuperación a tu correo.');
        
    });
}

    // --- OTRAS FUNCIONALIDADES ---

    // Funcionalidad para cerrar el banner superior
    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.querySelector('.close-banner-btn');
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
    }

    // Funcionalidad para el Header Fijo (Sticky Header)
    const header = document.getElementById('main-header');
    if (header) {
        const navOffsetTop = header.querySelector('.main-nav').offsetTop;
        window.addEventListener('scroll', () => {
            if (window.scrollY > navOffsetTop) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
});