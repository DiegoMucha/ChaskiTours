document.addEventListener("DOMContentLoaded", () => {
  const LIKES_KEY = "userLikes";
  const likes = JSON.parse(localStorage.getItem(LIKES_KEY)) || {};

  // Mostrar mensaje tipo toast
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Manejar los botones
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((btn) => {
    const card = btn.closest(".site-card");
    const title = btn.dataset.name;

    const countEl = card.querySelector(".rating span");
    let count = parseInt(countEl.textContent.match(/\d+/)[0]);

    if (likes[title]) {
      btn.classList.add("liked");
      btn.textContent = "Me gusta 💖";
      countEl.textContent = `${count + 1}`;
    }

    btn.addEventListener("click", () => {
      const isLiked = likes[title];

      if (isLiked) {
        delete likes[title];
        btn.classList.remove("liked");
        btn.textContent = "Me gusta ❤️";
        count--;
        showToast("Se ha eliminado de tus me gusta");
      } else {
        likes[title] = true;
        btn.classList.add("liked");
        btn.textContent = "Me gusta 💖";
        count++;
        showToast("Se ha añadido a tus me gusta satisfactoriamente");
      }

      countEl.textContent = `${count}`;
      localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    });
  });
});
