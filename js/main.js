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
