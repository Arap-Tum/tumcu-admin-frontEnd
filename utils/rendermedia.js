// FUNCTIONALITY
import {
  showToast,
  clearFilePreviews,
  closeEditModal,
  deleteClick,
} from "../src/script/scripts.js";

import { setupSearch } from "../src/script/search.js";

import {
  fetchMediaItems,
  createMediaItem,
  editmediaItem,
  deleteMediaItem,
} from "../src/API/allAPI.js";

let mediaItems = []; //global

// adding new media
export async function addMedia(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  document.getElementById("addItem").innerHTML = "Sending .......";

  try {
    const result = await createMediaItem(formData);
    showToast("Media added successfully!", "success");
    /*
    TESTING
    console.log("Created media:", result);
  */

    document.getElementById("addItem").innerHTML = "Add Media";

    e.target.reset();
    clearFilePreviews();
    loadMediaItems(); //reffresh the media list
  } catch (error) {
    console.log(" this is the error for posting data:" + error);
    showToast("failed to add media", "error");
  }
}

// Loading Data to the page
export async function loadMediaItems() {
  const galleryGrid = document.getElementById("galleryGrid");

  galleryGrid.innerHTML = "";

  mediaItems = await fetchMediaItems();
  // search();

  setupSearch("searchInput", galleryGrid, mediaItems, createCard, [
    "title",
    "type",
  ]);

  /*
    TESTING
    console.log("Fetched mediaItems:", mediaItems);
  */

  const cardsHTML = mediaItems.map((item) => createCard(item));
  galleryGrid.innerHTML = cardsHTML.join("");

  openEditModal();
  closeEditModal();
  deleteClick(".delete-btn", deleteItem);
}

// create card
function createCard(item) {
  return `<div class="media-card"> <a href="${item.link}" class="media-link"
 target="_blank">
        <div class="media-cover" 
        style= "background-image: url('${item.cover}')" >
        <div class="media-info">
            <h3 id="title" > ${item.title} </h3>
        </div>
        </div>
    </a>

        <div class="action-buttons">
          <button class=" cta edit-btn" data-id="${item._id}" >Edit</button>
            <button class="cta delete-btn"  data-id="${item._id}"> Delete</button>
        </div>
    </div>`;
}

// OPEN EDIT MODAL AND POPULATE IT WITH DATA
function openEditModal() {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", handleEditClick);
  });
}

// Edit item in modal functionality
async function handleEditClick(e) {
  try {
    const itemId = e.target.dataset.id;
    const item = mediaItems.find((i) => i._id === itemId);

    if (!item) return;

    const form = document.getElementById("edit-media-form");
    form.dataset.id = itemId;

    // Populate the edit form
    document.getElementById("edit-title").value = item.title;
    document.getElementById("edit-type").value = item.type;
    document.getElementById("edit-link").value = item.link;

    // Show current cover image
    const editPreview = document.getElementById("edit-file-preview");
    editPreview.innerHTML = `
        <img src="${item.cover}" alt="Current cover" />
       <p style="margin-top: 10px; color: #7f8c8d;">Current cover image</p>
       `;

    document.querySelector(".modal").style.display = "block";
  } catch (error) {
    console.error("Error loading media details:", error);
    showToast("Network error. Please try again.", "error");
  }
}

// save the edit changes
export async function saveEditChanges(e) {
  e.preventDefault();
  const form = e.target;
  const itemId = form.dataset.id;

  const formData = new FormData(form);
  document.getElementById("sendUpdateBtn").innerHTML = "Updating ....";

  if (!itemId) {
    showToast("Invalid item. Cannot update.", "error");
    return;
  }

  try {
    const result = await editmediaItem(itemId, formData);
    showToast("Media updated succesfully!", "success");

    document.getElementById("sendUpdateBtn").innerHTML = "Update Media";

    // console.log("Edit media result:", result);
    document.getElementById("sendUpdateBtn").innerText = "Sending....";
    document.querySelector(".modal").style.display = "none";

    loadMediaItems();
  } catch (error) {
    console.error("Error updating media:", error);
    showToast("Network error. Please try again.", "error");
  }
}

async function deleteItem(e) {
  const itemId = e.target.dataset.id;

  if (!itemId) {
    showToast("deleted succesfull", "success");
  }

  try {
    const result = await deleteMediaItem(itemId);
    showToast("Media deleted successfully!", "success");
    loadMediaItems(); // Refresh the media list
  } catch (error) {
    console.error("Error deleting media details:", error);
    showToast("Network error. Please try again.", "error");
  }
}
