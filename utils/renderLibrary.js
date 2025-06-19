// FUNCTIONALITY
import {
  showToast,
  clearFilePreviews,
  closeEditModal,
  deleteClick,
} from "../src/script/scripts.js";

// setup search
import { setupSearch } from "../src/script/search.js";

// All the apis
import {
  fetchLibraryItems,
  createLibraryItem,
  editLibraryItem,
  deleteLibraryItem,
} from "../src/API/allAPI.js";

let books = []; //global

// Load boks to the page
export async function displayBooks() {
  const itemCards = document.querySelector(".cards-grid");

  itemCards.innerHTML = "";

  books = await fetchLibraryItems();
  // -----  console.log("Fetched library books :", books);
  setupSearch("itemSearch", itemCards, books, createCard, [
    "title",
    "category",
    "description",
  ]);

  // setupSearch("itemSearch", itemCards, books, createCard);

  const cardsHTML = books.map((book) => createCard(book));
  itemCards.innerHTML = cardsHTML.join("");

  openEditModal();
  closeEditModal();
  deleteClick(".delete-btn", deleteItem);
}

function createCard(book) {
  return `
   <div class="book-card">
  <div class="book-cover">
  <img src="${book.cover}" alt="${book.title}" loading="lazy"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
  <div class="book-placeholder" style="display: none;">📚</div>
</div>
<div class="book-info">
  <h3 class="book-title">${book.title}</h3>
  <p class="book-author">by ${book.author}</p>
  <span class="book-category">${book.category}</span>

  <p class="book-description">${book.description}</p>
</div>

<div class="action-buttons">
          <button class=" cta edit-btn" data-id="${book._id}" >Edit</button>
            <button class="cta delete-btn"  data-id="${book._id}"> Delete</button>
        </div>
</div>
   `;
}

//Add new Book
export async function addNewBook(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  document.getElementById("addItem").innerHTML = "Sending ........";

  try {
    const result = await createLibraryItem(formData);
    showToast("Books added succesfully", "success");
    document.getElementById("addItem").innerHTML = "Add Book";

    // -------- console.log("add new book:", result);
    e.target.reset();
    clearFilePreviews();
    displayBooks(); //refresh the books
  } catch (error) {
    console.log(" this is the error for posting data:" + error);
    showToast("failed to add books", "error");
  }
}

// ----------------------------------
// EDIT
// ----------------------------

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
    const item = books.find((i) => i._id === itemId);

    if (!item) return;

    const form = document.getElementById("editItemForm");
    form.dataset.id = itemId;

    // Populate the edit form
    document.getElementById("editTitle").value = item.title;
    document.getElementById("editAuthor").value = item.author;
    document.getElementById("editCategory").value = item.category;
    document.getElementById("editDescription").value = item.description;

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

  document.getElementById("editItem").innerHTML = "Sending....";

  if (!itemId) {
    showToast("Invalid item. Cannot update.", "error");
    return;
  }

  try {
    const result = await editLibraryItem(itemId, formData);
    showToast("Media updated succesfully!", "success");

    document.getElementById("editItem").innerHTML = "Edit Leader";
    // console.log("Edit media result:", result);
    document.querySelector(".modal").style.display = "none";

    displayBooks();
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
    const result = await deleteLibraryItem(itemId);
    showToast("Item deleted successfully!", "success");
    displayBooks(); // Refresh the media list
  } catch (error) {
    console.error("Error deleting media details:", error);
    showToast("Network error. Please try again.", "error");
  }
}
