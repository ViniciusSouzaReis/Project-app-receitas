// const IN_PROGRESS_RECIPES = 'inProgressRecipes';
// const TIMEOUT = 500;
// const SUCCESS_STATUS = 'OK';

// if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
//   localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify([]));
// }
// const readInProgressRecipes = () => JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));

// const saveInProgressRecipes = (inProgressRecipes) => localStorage
//   .setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));

// const simulateRequest = (response) => (callback) => {
//   setTimeout(() => {
//     callback(response);
//   }, TIMEOUT);
// };

// export const getInProgressRecipes = () => new Promise((resolve) => {
//   const doneRecipes = readInProgressRecipes();
//   simulateRequest(doneRecipes)(resolve);
// });

// export const addInProgressRecipes = (song) => new Promise((resolve) => {
//   if (song) {
//     const favoriteSongs = readInProgressRecipes();
//     saveInProgressRecipes([...favoriteSongs, song]);
//   }
//   simulateRequest(SUCCESS_STATUS)(resolve);
// });

// export const removeDoneRecipes = (song) => new Promise((resolve) => {
//   const favoriteSongs = readInProgressRecipes();
//   saveInProgressRecipes(favoriteSongs.filter((s) => s.trackId !== song.trackId));
//   simulateRequest(SUCCESS_STATUS)(resolve);
// });

// const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

// if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
//   localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify([]));
// }

export const readInProgressRecipes = (key) => JSON.parse(localStorage.getItem(key));

export const saveInProgressRecipes = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getInProgressRecipes = (key) => new Promise((resolve) => {
  const doneRecipes = readInProgressRecipes(key);
  simulateRequest(doneRecipes)(resolve);
});

export const addInProgressRecipes = (key, value) => new Promise((resolve) => {
  if (value) {
    const prevValue = readInProgressRecipes(key);
    saveInProgressRecipes(key, [...prevValue, value]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

// export const addObjectInProgress = (id, value, type) => new Promise((resolve) => {
//   if (type === 'meals') {
//     const prevValue = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
//     saveInProgressRecipes(IN_PROGRESS_RECIPES, {
//       ...prevValue,
//       meals: {
//         ...prevValue.meals,
//         [id]: value,
//       },
//     });
//   } else {
//     const prevValue = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
//     saveInProgressRecipes(IN_PROGRESS_RECIPES, {
//       ...prevValue,
//       drinks: {
//         ...prevValue.drinks,
//         [id]: value,
//       },
//     });
//   }
//   simulateRequest(SUCCESS_STATUS)(resolve);
// });

// export const removeDoneRecipes = (key) => new Promise((resolve) => {
//   const favoriteSongs = readInProgressRecipes(key);
//   saveInProgressRecipes(favoriteSongs.filter((s) => s.trackId !== key.trackId));
//   simulateRequest(SUCCESS_STATUS)(resolve);
// });
