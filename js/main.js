document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE GESTIÓN DE USUARIOS ---

    // Función para obtener los usuarios guardados en localStorage.
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Función para guardar la lista de usuarios en localStorage.
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }


    // --- SELECTORES DE ELEMENTOS ---

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Elementos de sesión y formularios
    const profileContainer = document.getElementById('user-profile-container');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const recoverForm = document.getElementById('recover-form');

    // Elementos de la barra de búsqueda
    const destinationGroup = document.getElementById('destination-group');
    const destinationDropdown = document.getElementById('destination-dropdown');
    const destinationInput = document.getElementById('destination');
    const tourTypeGroup = document.getElementById('tour-type-group');
    const tourTypeDropdown = document.getElementById('tour-type-dropdown');
    const tourTypeInput = document.getElementById('tour-type');


    // --- LÓGICA DE INTERFAZ ---

    // Comportamiento del ícono de perfil (depende si la sesión está iniciada)
    if (profileContainer) {
        if (isLoggedIn) {
            profileContainer.addEventListener('click', function(event) {
                event.stopPropagation();
                closeAllDropdowns(dropdownMenu); // Cierra otros menús antes de abrir este
                dropdownMenu.classList.toggle('show');
            });
        } else {
            profileContainer.addEventListener('click', function() {
                window.location.href = 'inicio-sesion.html';
            });
        }
    }

    // Función mejorada para cerrar TODOS los dropdowns abiertos
    function closeAllDropdowns(exceptThisOne = null) {
        const allDropdowns = [dropdownMenu, destinationDropdown, tourTypeDropdown];
        allDropdowns.forEach(dropdown => {
            if (dropdown && dropdown !== exceptThisOne && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }

    // Cierra todos los menús si se hace clic fuera de ellos.
    document.addEventListener('click', () => closeAllDropdowns());

    // Lógica de la barra de búsqueda del Hero
    function setupSearchDropdown(group, dropdown, input) {
        if (!group || !dropdown) return;

        group.addEventListener('click', function(event) {
            event.stopPropagation();
            closeAllDropdowns(dropdown); // Cierra otros menús antes de abrir este
            dropdown.classList.toggle('show');
        });

        dropdown.addEventListener('click', function(event) {
            if (event.target.classList.contains('dropdown-item')) {
                input.value = event.target.textContent;
                dropdown.classList.remove('show');
            }
        });
    }

    // Inicializa la lógica para los dropdowns de búsqueda
    setupSearchDropdown(destinationGroup, destinationDropdown, destinationInput);
    setupSearchDropdown(tourTypeGroup, tourTypeDropdown, tourTypeInput);


    // --- LÓGICA DE FORMULARIOS ---

    // Event listener para el formulario de REGISTRO
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

    // Event listener para el formulario de INICIO DE SESIÓN
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

    // Event listener para el botón de CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'inicio-sesion.html';
        });
    }

    // Event listener para el formulario de RECUPERAR CONTRASEÑA
    if (recoverForm) {
        recoverForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Se ha enviado un enlace de recuperación a tu correo.');
            recoverForm.reset();
        });
    }


    // --- OTRAS FUNCIONALIDADES ---

    // Funcionalidad para cerrar el banner superior.
    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.querySelector('.close-banner-btn');
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
    }

    // Funcionalidad para el Header Fijo (Sticky Header).
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