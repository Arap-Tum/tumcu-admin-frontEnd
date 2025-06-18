import {
  initializeTabs,
  initializeFileUploads,
  connectNav,
} from "../script/scripts.js";

import {
  loadMediaItems,
  saveEditChanges,
  addMedia,
} from "../../utils/rendermedia.js";

// calling the functionnality
connectNav();
initializeTabs();
loadMediaItems();
initializeFileUploads();
setUpFormHanders();

// set up form handlers
function setUpFormHanders() {
  const addForm = document.getElementById("media-form");
  addForm.addEventListener("submit", addMedia);

  const editForm = document.getElementById("edit-media-form");
  editForm.addEventListener("submit", saveEditChanges);
}
