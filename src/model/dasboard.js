import { connectNav } from "../script/scripts.js";
connectNav();

import { updateDashboardCounts } from "../../utils/dasBoardCount.js";
document.addEventListener("DOMContentLoaded", updateDashboardCounts);
