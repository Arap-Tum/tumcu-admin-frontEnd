import {
  fetchMediaItems,
  fetchLibraryItems,
  fetchLeaders,
  fetchFormerLeaders,
} from "../src/API/allAPI.js";

export async function updateDashboardCounts() {
  try {
    const [media, library, leaders, formerLeaders] = await Promise.all([
      fetchMediaItems(),
      fetchLibraryItems(),
      fetchLeaders(),
      fetchFormerLeaders(),
    ]);

    document.getElementById("mediaCount").textContent = media.length;
    document.getElementById("libraryCount").textContent = library.length;
    document.getElementById("leadersCount").textContent = leaders.length;
    document.getElementById("formerLeadersCount").textContent =
      formerLeaders.length;
  } catch (error) {
    console.error("Failed to update dashboard counts:", error);
  }
}
