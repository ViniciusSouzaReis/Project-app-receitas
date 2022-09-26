function searchDrinkApiRequest(param, param2) {
  let URL;
  switch (param) {
  case 'ingredient':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param2}`;
    break;
  case 'name':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param2}`;
    break;
  default:
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param2}`;
  }
  return URL;
}

export default searchDrinkApiRequest;
