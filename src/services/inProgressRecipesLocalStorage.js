const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify([]));
}
const readInProgressRecipes = () => JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));

const saveInProgressRecipes = (inProgressRecipes) => localStorage
  .setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getInProgressRecipes = () => new Promise((resolve) => {
  const doneRecipes = readInProgressRecipes();
  simulateRequest(doneRecipes)(resolve);
});

export const addInProgressRecipes = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readInProgressRecipes();
    saveInProgressRecipes([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeDoneRecipes = (song) => new Promise((resolve) => {
  const favoriteSongs = readInProgressRecipes();
  saveInProgressRecipes(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
