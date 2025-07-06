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