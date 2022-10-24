const API = {
    url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    type: 'cocktail',
    id: '11007',
}   

const apiURL = `${API.url}${API.type}/${API.id}`
console.log(apiURL)