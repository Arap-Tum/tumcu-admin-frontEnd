// ---------------------------
//      CONNECT NAVIGATION
// ------------------------
import { initSidebar } from "./sidebar.js";
import { activeLink } from "./highlightNav.js";
export function connectNav() {
  fetch("navigation.html")
    .then((res) => res.text())
    .then((data) => {
      const nav = document.querySelector(".nav");
      nav.innerHTML = data;
      initSidebar();
      activeLink();
    });
}

/**-------------------------------------------------------------
 * Clear file previews in forms
 * =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---=-=-=-
 */
export function clearFilePreviews() {
  document.querySelectorAll(".file-preview").forEach((preview) => {
    preview.innerHTML = "";
  });
}

/**----------------------------------------------------------
 * Close EDIT MODAL
 * --------------------------------------------------------------------
 */
export function closeEditModal() {
  const closeModal = document.querySelector(".close");
  closeModal.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });
}

/**---------------------------------------------------------------------------------------
 * file upload
 * -------------------------------------------------------------------------------
 */

// File Upload
export function initializeFileUploads() {
  const fileUploads = document.querySelectorAll(".file-upload");

  fileUploads.forEach((upload) => {
    const input = upload.querySelector('input[type="file"]');
    const preview = upload.querySelector(".file-preview");

    // Click to upload
    upload.addEventListener("click", () => input.click());

    // File selection
    input.addEventListener("change", function () {
      handleFileSelection(this.files[0], preview);
    });

    // Drag and drop
    upload.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("dragover");
    });

    upload.addEventListener("dragleave", function () {
      this.classList.remove("dragover");
    });

    upload.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        input.files = e.dataTransfer.files;
        handleFileSelection(file, preview);
      }
    });
  });
}

function handleFileSelection(file, preview) {
  if (!file || !validateFile(file)) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image">`;
  };
  reader.readAsDataURL(file);
}

function validateFile(file) {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    showToast("Please select a valid image file (JPG, PNG, WEBP)", "error");
    return false;
  }

  if (file.size > maxSize) {
    showToast("File size must be less than 2MB", "error");
    return false;
  }

  return true;
}

/**---------------------------------------------------------------------------------------------------------------
 * show toast
 * --------------------------------------------------------------------------
 */

//  This function is used to shoe the toast notification
export function showToast(message, type = "success") {
  // remove existing toast if any
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  //   create new toast
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // show  toast with animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  //  Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

/**---------------------------------------------------------------------------------------------------------------
 * Initialize tabs
 * --------------------------------------------------------------------------
 */

// Tabs
export function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      const parentSection = this.closest(".page");

      // Update active tab button
      parentSection
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show target tab content
      parentSection
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// ----------------------
// delete button  functionality

// ----------------

export function deleteClick(deleteBtn, deletefn) {
  const deleteBtns = document.querySelectorAll(deleteBtn);
  // console.log(deleteBtn);
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", deletefn);
  });
}

// const deleteBtn = document.querySelectorAll(".delete-btn");
//   // console.log(deleteBtn);
//   deleteBtn.forEach((btn) => {
//     btn.addEventListener("click", deleteItem);
//   });
