document.addEventListener("DOMContentLoaded", function () {
  const notificaciones = document.querySelectorAll(".notificacion.card");

  notificaciones.forEach((card) => {
    // Botón para cerrar notificación
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.background = "#ffdddd";
    closeBtn.style.border = "1px solid red";
    closeBtn.style.borderRadius = "6px";
    closeBtn.style.cursor = "pointer";

    // Evento para eliminar la tarjeta
    closeBtn.addEventListener("click", () => {
      card.remove(); // Esto hace que las demás suban automáticamente
    });

    // Marcar como leída al hacer clic (menos el botón)
    card.addEventListener("click", (e) => {
      if (e.target !== closeBtn) {
        card.style.opacity = "0.5";
      }
    });

    card.appendChild(closeBtn);
  });
});
