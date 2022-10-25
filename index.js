// const API = {
//     url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
//     type: 'cocktail',
//     id: '11007',
// }   

// const apiURL = `${API.url}${API.type}/${API.id}`
// // console.log(apiURL)







// const drinkUl = document.getElementById('name-list')


// fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
//    .then(res => res.json())
//    .then(drinkData => {
//     // console.log(drinkData.drinks[0].strDrinks)
//     renderDrinks(drinkData)
  
//    })

// const renderDrinks = (drinkData) => {
//     drinkData.drinks.forEach(displayDrinks)

   
//     console.log(drinkData)
// }



// const displayDrinks = (drinkData) => { 

//     // console.log(drinkData.drinks[0].strDrink)

   

    

//     const drinkName = document.createElement('h2')
//     const drinkInst = document.createElement('p')
//     const drinkCategory = document.createElement('h3')
//     const drinkGlass = document.createElement('h4')
//     const drinkImg = document.createElement('img')

//     const ingredient1 = document.createElement('ul')
//     const ingredient2 = document.createElement('ul')
//     const ingredient3 = document.createElement('ul')
//     const ingredient4 = document.createElement('ul')
//     const ingredient5 = document.createElement('ul')
//     const ingredient6 = document.createElement('ul')
//     const ingredient7 = document.createElement('ul')
//     const ingredient8 = document.createElement('ul')

//     const measure1 = document.createElement('ul')
//     const measure2 = document.createElement('ul')
//     const measure3 = document.createElement('ul')
//     const measure4 = document.createElement('ul')
//     const measure5 = document.createElement('ul')
//     const measure6 = document.createElement('ul')
//     const measure7 = document.createElement('ul')
//     const measure8 = document.createElement('ul')

//     if (drinkData === null) {
//         drinkUl.textContent = '' 
//     }

 
//     drinkGlass.textContent = `Glass type: ${drinkData.strGlass}`
//     drinkImg.src = drinkData.strDrinkThumb
//     drinkImg.alt = drinkData.strDrink
//     drinkInst.textContent = `Instructions: ${drinkData.strInstructions}`
//     drinkCategory.textContent = `This is a ${drinkData.strCategory}`
//     drinkName.textContent = `Name: ${drinkData.strDrink}`

//     // if ( typeof(drinkData) === "null") {
//     //     drinkUl.innerHTML = ''
//     // }

//     // ingredient1.textContent = drinkData.strIngredient1
//     // ingredient2.textContent = drinkData.strIngredient2
//     // ingredient3.textContent = drinkData.strIngredient3
//     // ingredient4.textContent = drinkData.strIngredient4
//     // ingredient5.textContent = drinkData.strIngredient5
//     // ingredient6.textContent = drinkData.strIngredient6
//     // ingredient7.textContent = drinkData.strIngredient7
//     // ingredient8.textContent = drinkData.strIngredient8 


//     // measure1.textContent = drinkData.strMeasure1
//     // measure2.textContent = drinkData.strMeasure2
//     // measure3.textContent = drinkData.strMeasure3
//     // measure4.textContent = drinkData.strMeasure4
//     // measure5.textContent = drinkData.strMeasure5
//     // measure6.textContent = drinkData.strMeasure6
//     // measure7.textContent = drinkData.strMeasure7
//     // measure8.textContent = drinkData.strMeasure8

//     ingredient1.textContent= `${drinkData.strIngredient1} ${drinkData.strMeasure1}`
//     ingredient2.textContent = `${drinkData.strIngredient2} ${drinkData.strMeasure2}`
//     ingredient3.textContent = `${drinkData.strIngredient3} ${drinkData.strMeasure3}`
//     ingredient4.textContent = `${drinkData.strIngredient4} ${drinkData.strMeasure4}`
//     ingredient5.textContent = `${drinkData.strIngredient5} ${drinkData.strMeasure5}`
//     ingredient6.textContent = `${drinkData.strIngredient6} ${drinkData.strMeasure6}`
//     ingredient7.textContent = `${drinkData.strIngredient7} ${drinkData.strMeasure7}`
//     ingredient8.textContent = `${drinkData.strIngredient8} ${drinkData.strMeasure8}`

//     drinkUl.append(drinkName, 
//         ingredient1, ingredient2, ingredient3, ingredient4, ingredient5,  ingredient6,  ingredient7,  ingredient8,
//         measure1, measure2, measure3, measure4, measure5, measure6, measure7, measure8,
//          drinkInst, drinkGlass, drinkImg, drinkCategory 

//          )

//         //  if ( typeof(drinkData) === "null") {
//         //     drinkUl.innerHTML = ''
//         // }
    
  

// }




//DRINK RANDOMIZER



const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

const rDrinkImg = document.createElement('img')

const randomizerDiv = document.getElementById('random-drink');
const rButton = document.getElementById('random-btn');


const getRandomDrink = () => {

    fetch(API_URL)
        .then( res => res.json())
        .then( drink => {
            console.log(drink)
            rDrinkImg.style.visibility = 'visible'

            renderDrink(drink)
            
            // displayDrink()

        })

}

const renderDrink = (drink) => {
    drink.drinks.forEach(displayRDrink)
 
}


const displayRDrink = (drink) => {


  
    const rDrinkName = document.createElement('name')

    // rDrinkImg.style.visibility = 'hidden'

    randomizerDiv.innerHTML = ''

    rDrinkName.textContent = drink.strDrink
    rDrinkImg.src = drink.strDrinkThumb

    randomizerDiv.append(rDrinkName, rDrinkImg)
    
    rButton.addEventListener('click', getRandomDrink)

    // rDrinkImg.style.visibility = 'hidden'

    console.log(drink.strDrink)

    

}


const init = () => {
    getRandomDrink()

}

init()




