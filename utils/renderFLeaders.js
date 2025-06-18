// FUNCTIONALITY
import {
  showToast,
  clearFilePreviews,
  closeEditModal,
  deleteClick,
} from "../src/script/scripts.js";

// setup search
import { setupSearch } from "../src/script/search.js";

import {
  fetchFormerLeaders,
  createFormerLeader,
  editFormerLeader,
  deleteFormerLeader,
} from "../src/API/allAPI.js";

let leaders = []; //global

//   looad leaders to the page
export async function displayLeaders() {
  const itemCards = document.querySelector(".cards-grid");

  itemCards.innerHTML = "";

  leaders = await fetchFormerLeaders();
  // -----  console.log("Fetched library leaders :", leaders);
  setupSearch("itemSearch", itemCards, leaders, createCard, [
    "name",
    "position",
    "year",
    "course",
  ]);

  // setupSearch("itemSearch", itemCards, leaders, createCard);

  const cardsHTML = leaders.map((item) => createCard(item));
  itemCards.innerHTML = cardsHTML.join("");

  openEditModal();
  closeEditModal();
  deleteClick(".delete-btn", deleteItem);
}

function createCard(item) {
  return ` <div class="leader-card">
                    <img src="${item.cover}" alt="${item.name}" class="leader-photo" onerror="this.src='https://via.placeholder.com/300x450/006400/ffffff?text=Photo'">
                    <div class="leader-info">
                        <h3 class="leader-name">${item.name}</h3>
                        <div class="leader-position">${item.position}</div>
                        
                        <div class="leader-details">
                            <div class="detail-item">
                                <svg class="detail-icon" viewBox="0 0 24 24">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                </svg>
                                <span>${item.year} • ${item.course}</span>
                            </div>                          
                        </div>
                    </div>
                    <div class="action-buttons">
          <button class=" cta edit-btn" data-id="${item._id}" >Edit</button>
            <button class="cta delete-btn"  data-id="${item._id}"> Delete</button>
        </div>
                </div>
    `;
}
// ADD NEW LEADER

export async function addLeader(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const result = await createFormerLeader(formData);
    showToast("leader adaded succesfully", "success");
    console.log("Leaders data:", result);

    e.target.reset();
    clearFilePreviews();
    displayLeaders(); //refresh the leaders
  } catch (error) {
    console.log(" this is the error for posting data:" + error);
    showToast("failed to add leaders", "error");
  }
}

// cicking the button to open the edit modal
function openEditModal() {
  const editButtons = document.querySelectorAll(".edit-btn");
  // console.log(editButtons);
  editButtons.forEach((btn) => {
    btn.addEventListener("click", handleEditClick);
  });
}

async function handleEditClick(e) {
  try {
    const itemId = e.target.dataset.id;
    const item = leaders.find((i) => i._id === itemId);

    if (!item) return;

    const form = document.getElementById("editItemForm");
    form.dataset.id = itemId;

    // Populate the edit form
    document.getElementById("name").value = item.name;
    document.getElementById("position").value = item.position;
    document.getElementById("year").value = item.year;
    document.getElementById("course").value = item.course;

    // Show current cover image
    const editPreview = document.getElementById("editFilePreview");
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

  if (!itemId) {
    showToast("Invalid item. Cannot update.", "error");
    return;
  }

  try {
    const result = await editFormerLeader(itemId, formData);
    showToast("Media updated succesfully!", "success");

    // console.log("Edit media result:", result);
    document.querySelector(".modal").style.display = "none";

    displayLeaders();
  } catch (error) {
    console.error("Error updating media:", error);
    showToast("Network error. Please try again.", "error");
  }
}

async function deleteItem(e) {
  const itemId = e.target.dataset.id;

  if (!itemId) {
    showToast("Item not found", "error");
  }

  try {
    const result = await deleteFormerLeader(itemId);
    showToast("Item deleted successfully!", "success");
    displayLeaders(); // Refresh the media list
  } catch (error) {
    console.error("Error deleting media details:", error);
    showToast("Network error. Please try again.", "error");
  }
}
