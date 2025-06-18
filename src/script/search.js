export function setupSearch(
  inputId,
  gridElement,
  dataItems,
  createCardFn,
  searchFields = ["title"]
) {
  const inputElement = document.getElementById(inputId);

  if (!inputElement) {
    console.error(`Input with ID "${inputId}" not found.`);
    return;
  }

  function initializeSearch(items) {
    const searchTerm = inputElement.value.toLowerCase();
    if (!searchTerm) return items;

    return items.filter((item) =>
      searchFields.some((field) =>
        (item[field] || "").toLowerCase().includes(searchTerm)
      )
    );
  }

  inputElement.addEventListener("input", () => {
    const filteredItems = initializeSearch(dataItems);
    const cardsHTML = filteredItems.map((item) => createCardFn(item)).join("");
    gridElement.innerHTML = cardsHTML;
  });
}

// ----------------------Previous functionality -------------

// // function initializeSearch(media) {
//   const searchTerm = document
//     .getElementById("media-search")
//     .value.toLowerCase();

//   let filterdMedia = [...media];

//   // apply search filter
//   if (searchTerm) {
//     filterdMedia = filterdMedia.filter(
//       (media) =>
//         media.title.toLowerCase().includes(searchTerm) ||
//         media.type.toLowerCase().includes(searchTerm)
//     );
//   }

//   return filterdMedia;
// }

// // export function setupSearch(inputId, gridElement, dataItems, createCardFn) {
//   const inputElement = document.getElementById(inputId);

//   if (!inputElement) {
//     console.error(`Input with ID "${inputId}" not found.`);
//     return;
//   }

//   inputElement.addEventListener("input", () => {
//     const filteredItems = initializeSearch(dataItems);
//     const cardsHTML = filteredItems.map((item) => createCardFn(item));
//     gridElement.innerHTML = cardsHTML.join("");
//   });
// }

// // -------------- previous working function ------------- //
// // function search() {
// //   document
// //     .getElementById("media-search")
// //     .addEventListener("input", async () => {
// //       const filterdMediaItem = initializeSearch(mediaItems);
// //       // console.log("filterd Media:", filterdMediaItem);
// //       const cardsHTML = filterdMediaItem.map((item) => createCard(item));

// //       galleryGrid.innerHTML = cardsHTML.join("");
// //     });
// // }

// // export function setupSearch(inputId, gridElement, dataItems, createCardFn) {
//   const inputElement = document.getElementById(inputId);

//     // const searchTerm = inputElement.value.toLowerCase();

//     // letFilterd

// function initializeSearch(dataItems) {
//   const searchTerm = inputElement.value.toLowerCase();

//     letFilterdData = [...dataItems];
//    if (searchTerm) {
//     filteredItems = filter(
//       (dataItems) =>
//         dataItems.toLowerCase().inlude
//     )
//    }

// }

//   if (!inputElement) {
//     console.error(`Input with ID "${inputId}" not found.`);
//     return;
//   }

//   inputElement.addEventListener("input", () => {
//     const filteredItems = initializeSearch(dataItems);
//     const cardsHTML = filteredItems.map((item) => createCardFn(item));
//     gridElement.innerHTML = cardsHTML.join("");
//   });
// }
