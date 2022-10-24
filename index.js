const API = {
    url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    type: 'cocktail',
    id: '11007',
}   

const apiURL = `${API.url}${API.type}/${API.id}`
console.log(apiURL)


fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
   .then(res => res.json())
   .then(drinkData => {
    // console.log(drinkData.drinks[0].strDrinks)
    renderDrinks(drinkData)
   })

const renderDrinks = (drinkData) => {
    drinkData.drinks.forEach(displayDrinks)
    console.log(drinkData)
}



const displayDrinks = (drinkData) => { 

    // console.log(drinkData.drinks[0].strDrink)

    const drinkUl = document.getElementById('name-list')

    const drinkLi = document.createElement('li')

    drinkLi.textContent = drinkData.strTags

    drinkUl.append(drinkLi)

}



