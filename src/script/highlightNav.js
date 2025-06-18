export function activeLink() {
  // Get current page filename (e.g., 'media.html')
  const currentPage = window.location.pathname.split("/").pop();

  // Get all nav links
  const navLinks = document.querySelectorAll(".nav-links a");

  // Loop through links and set active class
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
