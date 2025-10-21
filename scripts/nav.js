document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      document.querySelector(`#${link.dataset.page}`)?.id === link.dataset.page
    ) {
      link.classList.add("active");
    }
  });
});
