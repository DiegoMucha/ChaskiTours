document.addEventListener("DOMContentLoaded", () => {
  const activityList = document.getElementById("activityList");
  const searchInput = document.getElementById("searchInput");
  const sortButton = document.getElementById("sortButton");

  let orderAsc = false;

  const actividades = [
    { fecha: "2025-05-13", descripcion: "Inicio de sesión" },
    { fecha: "2025-05-12", descripcion: "Edición de perfil" },
    { fecha: "2025-05-07", descripcion: "Plaza Mayor de Lima" },
    { fecha: "2025-05-04", descripcion: "Creación de cuenta" }
  ];

  function renderLista(data) {
    activityList.innerHTML = "";
    data.forEach(act => {
      const p = document.createElement("p");
      const fechaFormateada = act.fecha.split("-").reverse().join("/");
      p.textContent = `${fechaFormateada} - ${act.descripcion}`;
      p.style.marginBottom = "15px";
      activityList.appendChild(p);
    });
  }

  // Filtro por búsqueda
  searchInput.addEventListener("input", () => {
    const filtro = searchInput.value.toLowerCase();
    const filtradas = actividades.filter(act =>
      act.descripcion.toLowerCase().includes(filtro)
    );
    renderLista(ordenar(filtradas));
  });

  // Ordenar por fecha
  sortButton.addEventListener("click", () => {
    orderAsc = !orderAsc;
    sortButton.textContent = orderAsc ? "Ordenar por fecha ↓" : "Ordenar por fecha ↑";
    renderLista(ordenar(actividades));
  });

  function ordenar(lista) {
    return [...lista].sort((a, b) => {
      if (orderAsc) return new Date(a.fecha) - new Date(b.fecha);
      else return new Date(b.fecha) - new Date(a.fecha);
    });
  }

  // Botón Ver detalles
  const button = document.querySelector(".button");
  if (button) {
    button.addEventListener("click", () => {
      showToast("Has abierto los detalles de la actividad.");
    });
  }

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Inicial
  renderLista(ordenar(actividades));
});
