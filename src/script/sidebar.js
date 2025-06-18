export function initSidebar() {
  const sidebar = document.getElementById("sidebar-wrapper");
  const hamburger = document.getElementById("hamburger");

  // Create overlay dynamically
  const overlay = document.createElement("div");
  overlay.classList.add("sidebar-overlay");
  document.body.appendChild(overlay);

  const closeBtn = document.getElementById("sidebar-close");

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.style.display = "block";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
  }

  hamburger.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
}

// // Initialize when DOM is ready
// document.addEventListener("DOMContentLoaded", initSidebar);
