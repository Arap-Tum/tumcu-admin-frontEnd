import {
  initializeTabs,
  initializeFileUploads,
  connectNav,
} from "../script/scripts.js";
import {
  displayLeaders,
  addLeader,
  saveEditChanges,
} from "../../utils/renderLeaders.js";

connectNav();
initializeTabs();
initializeFileUploads();
displayLeaders();
setUpFormHanders();

function setUpFormHanders() {
  const addForm = document.getElementById("addItemForm");
  addForm.addEventListener("submit", addLeader);

  const editForm = document.getElementById("editItemForm");
  editForm.addEventListener("submit", saveEditChanges);
}
