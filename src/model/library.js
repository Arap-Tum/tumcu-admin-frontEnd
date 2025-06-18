import {
  initializeTabs,
  initializeFileUploads,
  connectNav,
} from "../script/scripts.js";

import {
  displayBooks,
  addNewBook,
  saveEditChanges,
} from "../../utils/renderLibrary.js";

connectNav();
displayBooks();
initializeTabs();
initializeFileUploads();
setUpFormHanders();

function setUpFormHanders() {
  const addForm = document.getElementById("addItemForm");
  addForm.addEventListener("submit", addNewBook);

  const editForm = document.getElementById("editItemForm");
  editForm.addEventListener("submit", saveEditChanges);
}
