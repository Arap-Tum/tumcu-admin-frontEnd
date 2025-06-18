// Configuration
const baseUrl = "https://tumcubackend-production.up.railway.app";

// Fetch media items from backend
export async function fetchMediaItems() {
  try {
    const response = await fetch(`${baseUrl}/api/media`);
    if (!response.ok) {
      throw new Error("Failed to fetch media items");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching media items:", error);
    return [];
  }
}

// POST MEDIA
export async function createMediaItem(formData) {
  const response = await fetch(`${baseUrl}/api/media`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "fAILED TO UPLOAD  MEDIA");
  }

  return await response.json();
}

// put
export async function editmediaItem(id, formData) {
  const response = await fetch(`${baseUrl}/api/media/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "FAILED TO EDIT THE MEDIA");
  }

  return await response.json();
}

// delete
export async function deleteMediaItem(id) {
  const response = await fetch(`${baseUrl}/api/media/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "FAILED TO DELETE THE MEDIA");
  }

  return await response.json();
}
