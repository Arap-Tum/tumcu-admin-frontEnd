const baseUrl = "https://tumcubackend-production.up.railway.app";

// A Generic Fetch function

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/api/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// A Generic post function

async function createData(endpoint, formData) {
  const response = await fetch(`${baseUrl}/api/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "fAILED TO UPLOAD  DATA");
  }

  return await response.json();
}

// Generic put
async function editData(endpoint, id, formData) {
  const response = await fetch(`${baseUrl}/api/${endpoint}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "FAILED TO EDIT THE item");
  }

  return await response.json();
}

// Generic delete
async function deleteData(endpoint, id) {
  const response = await fetch(`${baseUrl}/api/${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "FAILED TO DELETE ITEM");
  }

  return await response.json();
}
// GET

export const fetchMediaItems = () => fetchData("media");
export const fetchLibraryItems = () => fetchData("books");
export const fetchLeaders = () => fetchData("leaders");
export const fetchFormerLeaders = () => fetchData("formerLeaders");

// POST

export const createMediaItem = (formData) => createData("media", formData);
export const createLibraryItem = (formData) => createData("books", formData);
export const createLeader = (formData) => createData("leaders", formData);
export const createFormerLeader = (formData) =>
  createData("formerLeaders", formData);

// PUT

export const editmediaItem = (id, formData) => editData("media", id, formData);
export const editLibraryItem = (id, formData) =>
  editData("books", id, formData);
export const editLeader = (id, formData) => editData("leaders", id, formData);
export const editFormerLeader = (id, formData) =>
  editData("formerLeaders", id, formData);

// DELETE
export const deleteMediaItem = (id) => deleteData("media", id);
export const deleteLibraryItem = (id) => deleteData("books", id);
export const deleteLeader = (id) => deleteData("leaders", id);
export const deleteFormerLeader = (id) => deleteData("formerLeaders", id);
