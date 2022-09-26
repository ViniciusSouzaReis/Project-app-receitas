function searchFoodApiRequest(type, filter, paramFilter) {
  let URL;
  switch (filter) {
  case 'ingredient':
    URL = `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${paramFilter}`;
    break;
  case 'name':
    URL = `https://www.the${type}db.com/api/json/v1/1/search.php?s=${paramFilter}`;
    break;
  case 'first-letter':
    URL = `https://www.the${type}db.com/api/json/v1/1/search.php?f=${paramFilter}`;
    break;
  case 'detail':
    URL = `https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${paramFilter}`;
    break;
  default:
    URL = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
  }

  return URL;
}

export default searchFoodApiRequest;
