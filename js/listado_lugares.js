const lugares = [
  {
    titulo: "Plaza Mayor de Lima",
    descripcion: "Plaza conocida como el sitio fundacional de Lima, rodeada de edificios históricos.",
    imagen: "assets/img/plaza-mayor-lima.jpg",
    calificacion: "4.76 (343)",
    categoria: "Arte y Cultura"
  },
  {
    titulo: "Circuito Mágico del Agua",
    descripcion: "Parque atractivo con fuentes de agua iluminadas, ideal para visitar de noche.",
    imagen: "assets/img/circuito-magico-agua.png",
    calificacion: "4.76 (343)",
    categoria: "Entretenimiento"
  },
  {
    titulo: "Puente de los Suspiros",
    descripcion: "Puente romántico en Barranco rodeado de arte urbano y cafeterías.",
    imagen: "assets/img/puente-suspiros.jpg",
    calificacion: "4.76 (343)",
    categoria: "Arte y Cultura"
  },
  {
    titulo: "Museo Larco",
    descripcion: "Museo con arte precolombino en Lima, famoso por su colección de cerámica erótica.",
    imagen: "assets/img/museo_larco.png",
    calificacion: "4.81 (210)",
    categoria: "Arte y Cultura"
  },
  {
    titulo: "Parque Kennedy",
    descripcion: "Parque central de Miraflores, famoso por sus gatos y su vida nocturna.",
    imagen: "assets/img/parque_kennedy.png",
    calificacion: "4.65 (300)",
    categoria: "Entretenimiento"
  },
  {
    titulo: "Malecón de Miraflores",
    descripcion: "Paseo con vistas al mar, ideal para caminatas, ciclismo y parapente.",
    imagen: "assets/img/malecon.png",
    calificacion: "4.89 (420)",
    categoria: "Entretenimiento"
  },
  {
    titulo: "Huaca Pucllana",
    descripcion: "Sitio arqueológico preincaico ubicado en el corazón de Miraflores.",
    imagen: "assets/img/huaca_pucllana.jpg",
    calificacion: "4.70 (190)",
    categoria: "Arte y Cultura"
  },
  {
    titulo: "Mercado de Surquillo",
    descripcion: "Mercado tradicional con ingredientes frescos y puestos de comida típica.",
    imagen: "assets/img/mercado_surquillo.jpg",
    calificacion: "4.60 (150)",
    categoria: "Gastronomía"
  },
  {
    titulo: "Barranco Beer Company",
    descripcion: "Cervecería artesanal popular entre locales y turistas.",
    imagen: "assets/img/barranco_beer.jpg",
    calificacion: "4.75 (215)",
    categoria: "Gastronomía"
  },
  {
    titulo: "Museo de Arte de Lima (MALI)",
    descripcion: "Museo con una rica colección de arte peruano desde la época precolombina hasta hoy.",
    imagen: "assets/img/mali.jpg",
    calificacion: "4.83 (300)",
    categoria: "Arte y Cultura"
  },
  {
    titulo: "Larcomar",
    descripcion: "Centro comercial frente al mar con tiendas, restaurantes y cine.",
    imagen: "assets/img/larcomar.jpg",
    calificacion: "4.70 (500)",
    categoria: "Entretenimiento"
  },
  {
    titulo: "Restaurante Central",
    descripcion: "Uno de los mejores restaurantes del mundo, con enfoque en insumos peruanos.",
    imagen: "assets/img/central.jpg",
    calificacion: "4.95 (390)",
    categoria: "Gastronomía"
  }
];
  
  const lugaresPorPagina = 3;
  let paginaActual = 1;
  


  function renderizarLugares(pagina) {
    const contenedor = document.querySelector(".cards-container");
    contenedor.innerHTML = ""; // Limpiar tarjetas
  
    const inicio = (pagina - 1) * lugaresPorPagina;
    const fin = inicio + lugaresPorPagina;
    const lugaresActuales = lugares.slice(inicio, fin);
  
    lugaresActuales.forEach((lugar) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "card";
      tarjeta.innerHTML = `
        <div class="card-content">
          <img src="${lugar.imagen}" alt="${lugar.titulo}">
          <h3>${lugar.titulo}</h3>
          <p>${lugar.descripcion}</p>
          <div class="card-footer">
            <div class="rating">
              <div class="rating-image">
                <img src="assets/icons/estrella.png" alt="Estrella">
              </div>
              <div class="rating-text">
                <p class="title">Calificación</p>
                <p class="rating-numbers">${lugar.calificacion}</p>
              </div>
            </div>
            <a href="ver-detalles.html"><button class="ver-detalles">Ver detalles</button></a>
            <div class="favorito">❤️ ¿Desea guardar como favorito?</div>
            <button class="guardar-favorito">Guardar como favorito</button>
          </div>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  }
  
  function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarLugares(paginaActual);
    actualizarBotones();
  }
  
  function actualizarBotones() {
    const botones = document.querySelectorAll(".pagination .page");
    botones.forEach((btn, i) => {
      btn.classList.toggle("active", i + 1 === paginaActual);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderizarLugares(paginaActual);
  
    const botones = document.querySelectorAll(".pagination .page");
    botones.forEach((btn, i) => {
      btn.addEventListener("click", () => cambiarPagina(i + 1));
    });
  });
  
  let filtroCategoria = null;
  let listaFiltrada = [...lugares];

  function aplicarFiltros() {
    listaFiltrada = [...lugares];
  
    if (filtroCategoria) {
      listaFiltrada = listaFiltrada.filter(lugar => lugar.categoria === filtroCategoria);
    }
  
    paginaActual = 1;
    renderizarLugaresFiltrados(listaFiltrada, paginaActual);
    actualizarBotones(Math.ceil(listaFiltrada.length / lugaresPorPagina));
  }

function renderizarLugaresFiltrados(lista, pagina) {
  const contenedor = document.querySelector(".cards-container");
  contenedor.innerHTML = "";

  const inicio = (pagina - 1) * lugaresPorPagina;
  const fin = inicio + lugaresPorPagina;
  const lugaresActuales = lista.slice(inicio, fin);

  lugaresActuales.forEach((lugar) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card";
    tarjeta.innerHTML = `
      <div class="card-content">
        <img src="${lugar.imagen}" alt="${lugar.titulo}">
        <h3>${lugar.titulo}</h3>
        <p>${lugar.descripcion}</p>
        <div class="card-footer">
          <div class="rating">
            <div class="rating-image">
              <img src="assets/icons/estrella.png" alt="Estrella">
            </div>
            <div class="rating-text">
              <p class="title">Calificación</p>
              <p class="rating-numbers">${lugar.calificacion}</p>
            </div>
          </div>
          <a href="ver-detalles.html"><button class="ver-detalles">Ver detalles</button></a>
          <div class="favorito">❤️ ¿Desea guardar como favorito?</div>
          <button class="guardar-favorito">Guardar como favorito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// Reescribe esta función para aceptar cantidad dinámica de páginas
function actualizarBotones(numPaginas) {
  const paginacion = document.querySelector(".pagination");
  paginacion.innerHTML = "";

  for (let i = 1; i <= numPaginas; i++) {
    const btn = document.createElement("button");
    btn.className = "page" + (i === paginaActual ? " active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      paginaActual = i;
      renderizarLugaresFiltrados(listaFiltrada, paginaActual); // usar lista filtrada
      actualizarBotones(numPaginas);
    });
    paginacion.appendChild(btn);
  }
}


// Escuchar radios
document.addEventListener("DOMContentLoaded", () => {
  // Leer parámetro de la URL para filtro por categoría
  const params = new URLSearchParams(window.location.search);
  const categoriaURL = params.get('categoria');

  if (categoriaURL) {
    filtroCategoria = categoriaURL;
    listaFiltrada = lugares.filter(lugar => lugar.categoria === filtroCategoria);
    renderizarLugaresFiltrados(listaFiltrada, paginaActual);
    actualizarBotones(Math.ceil(listaFiltrada.length / lugaresPorPagina));
    // Marcar el radio correspondiente si existe
    document.querySelectorAll('input[name="categoria"]').forEach(input => {
      if (input.value === filtroCategoria) input.checked = true;
    });
  } else {
    renderizarLugaresFiltrados(lugares, paginaActual);
    actualizarBotones(Math.ceil(lugares.length / lugaresPorPagina));
  }

  // Escucha selección de categoría
  document.querySelectorAll('input[name="categoria"]').forEach(input => {
    input.addEventListener("change", () => {
      filtroCategoria = input.nextSibling.textContent.trim(); // obtener texto al lado del input
      aplicarFiltros();
    });
  });
});