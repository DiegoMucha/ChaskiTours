document.addEventListener('DOMContentLoaded', () => {
  const botonesCompartir = document.querySelectorAll('.compartir');
  const popup = document.getElementById('compartir-popup');
  const emailInput = document.getElementById('email');
  const cancelarBtn = document.getElementById('cancelar-compartir');
  const enviarBtn = document.getElementById('enviar-compartir');
  const lugarTexto = document.getElementById('lugares-seleccionados');

  // Almacena los lugares seleccionados
  const lugaresSeleccionados = new Set();

  // Al hacer click en un icono compartir
  botonesCompartir.forEach((boton) => {
    boton.style.cursor = 'pointer'; // cambia cursor para indicar clickeable

    boton.addEventListener('click', () => {
      const lugar = boton.parentElement.querySelector('.txt_pre').textContent;

      // Alternar selección
      if (boton.classList.contains('seleccionado')) {
        boton.classList.remove('seleccionado');
        lugaresSeleccionados.delete(lugar);
      } else {
        boton.classList.add('seleccionado');
        lugaresSeleccionados.add(lugar);
      }

      // Mostrar u ocultar popup según haya o no seleccionados
      if (lugaresSeleccionados.size > 0) {
        lugarTexto.textContent = 'Lugares: ' + Array.from(lugaresSeleccionados).join(', ');
        popup.classList.remove('oculto');
      } else {
        popup.classList.add('oculto');
      }
    });
  });

  // Botón cancelar: limpia selección y oculta popup
  cancelarBtn.addEventListener('click', () => {
    lugaresSeleccionados.clear();
    botonesCompartir.forEach(boton => boton.classList.remove('seleccionado'));
    emailInput.value = '';
    popup.classList.add('oculto');
  });

  // Botón enviar: valida email, muestra alerta y limpia todo
  enviarBtn.addEventListener('click', () => {
    const correo = emailInput.value.trim();

    if (!correo) {
      alert('Por favor ingresa un correo.');
      return;
    }

    const lugares = Array.from(lugaresSeleccionados).join(', ');
    alert(`Lugares compartidos con ${correo}:\n${lugares}`);

    // Resetear todo después de compartir
    lugaresSeleccionados.clear();
    botonesCompartir.forEach(boton => boton.classList.remove('seleccionado'));
    emailInput.value = '';
    popup.classList.add('oculto');
  });
});
