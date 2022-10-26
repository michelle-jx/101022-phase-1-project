//Creating the Form and search. 

let possibleCocktails1 = [];
let possibleCocktails2 = [];
let possibleCocktails3 = [];
let possibleCocktails4 = [];
let possibleCocktails5 = [];

getEnteredIngredients();

function getEnteredIngredients() {

    const somethingToGrab = document.getElementById('create-ingredients-list');
    const ingredientsForm = document.createElement('form');
    const getFirstIngredient = document.createElement('input');
    const getSecondIngredient = document.createElement('input');
    const getThirdIngredient = document.createElement('input');
    const getFourthIngredient = document.createElement('input');
    const getFifthIngredient = document.createElement('input');
    const submitButton = document.createElement('button');

    getFirstIngredient.placeholder = 'Ingredient';
    getSecondIngredient.placeholder = 'Ingredient';
    getThirdIngredient.placeholder = 'Ingredient';
    getFourthIngredient.placeholder = 'Ingredient';
    getFifthIngredient.placeholder = 'Ingredient';
    submitButton.textContent = 'Submit Ingredients';

    somethingToGrab.append(ingredientsForm)
    ingredientsForm.append(getFirstIngredient, getSecondIngredient, getThirdIngredient, getFourthIngredient, getFifthIngredient, submitButton);

    let enteredCocktailIngredients = []

    ingredientsForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // const ingrOneSearch = e.target[0].value
        // const ingrTwoSearch = e.target[1].value
        // const ingrThreeSearch = e.target[2].value
        // const ingrFourSearch = e.target[3].value
        // const ingrFiveSearch = e.target[4].value

        for (i = 0; i < 5; i++) {
            enteredCocktailIngredients.push(e.target[i].value)
        }
        console.log(enteredCocktailIngredients)
        searchIngredients(enteredCocktailIngredients)

        // console.log(cocktailIngredients)
        // console.log(ingrOneSearch)
        // console.log(ingrTwoSearch)
        // console.log(ingrThreeSearch)
        // console.log(ingrFourSearch)
        // console.log(ingrFiveSearch)
        // searchIngredients(ingrOneSearch)
        // searchIngredients(ingrTwoSearch)
        // searchIngredients(ingrThreeSearch)
        // searchIngredients(ingrFourSearch)
        // searchIngredients(ingrFiveSearch)

    })

}

function searchIngredients(ingrSearchArray) {
    console.log("Search Ingredients is running");
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(res => res.json())
        .then(drinkData => {
            //console.log(drinkData)
            drinkData.drinks.forEach((singleDrinkData) => {
                getCocktailIngredients(singleDrinkData, ingrSearchArray)
                // I tried drinkData.drinks to be passed above and it changed what was
                // console.logged slightly, but I still couldn't access data I needed
                // Phil clarified. I needed to pass just the one drink. Not the entire array.
                //console.log(possibleCocktails)
            })
        })
    // for (i=0; i<5; i++) {
    //     console.log('Did I run?')
    //  if (ingredient1 === ingrOneSearch){
    //     possibleCocktails.push(drinkData.strDrink)
    //     console.log(possibleCocktails)
    //  }
    //  else  {console.log('Hi')
    //  }
    //do I set it to a boolean?
}
function getCocktailIngredients(singleDrinkData, ingrSearchArray) {

    //console.log("getCocktailIngredients ran")
    //console.log(ingrSearchArray)
    //console.log(singleDrinkData)
    //console.log(typeof(singleDrinkData))
    //console.log(singleDrinkData.strDrink)
    // let singleCocktailIngredients = []
    // for (i=1; i<6; i++){
    //     console.log(singleDrinkData.strIngredient[i])
    //     //singleCocktailIngredients.push(singleDrinkData.strIngredient[i])
    // }

    for (i = 0; i < 5; i++) {

        //console.log(ingrSearchArray[i])
        //console.log(singleDrinkData[`strIngredient${i+1}`])
        for (j = 1; j < 6; j++) {
            if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`] && i === 0) {
                possibleCocktails1.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`] && i === 1) {
                possibleCocktails2.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`] && i === 2) {
                possibleCocktails3.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`] && i === 3) {
                possibleCocktails4.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`] && i === 4) {
                possibleCocktails5.push(singleDrinkData.strDrink)
            }
        }
    }
    console.log(possibleCocktails1)
    console.log(possibleCocktails2)
    console.log(possibleCocktails3)
    console.log(possibleCocktails4)
    console.log(possibleCocktails5)

}

//Dislay drink Informattion


fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(res => res.json())
    .then(drinkData => {
        // console.log(drinkData.drinks[0].strDrinks)
        renderDrinks(drinkData)
    })

const renderDrinks = (drinkData) => {
    drinkData.drinks.forEach(displayDrinks)
    console.log(drinkData)
}


const drinkUl = document.getElementById('name-list')

const displayDrinks = (drinkData) => {

    // console.log(drinkData.drinks[0].strDrink
    const drinkName = document.createElement('h2')
    const drinkInst = document.createElement('p')
    const drinkCategory = document.createElement('h3')
    const drinkGlass = document.createElement('h4')
    const drinkImg = document.createElement('img')

    drinkUl.append(drinkName)
    for (let i = 1; i < 16; i++) {
        console.log(i)
        if (drinkData[`strIngredient${i}`] == null) {
            break
        }

        const ingredient = document.createElement('ul')

        ingredient.innerHTML = drinkData[`strMeasure${i}`] + drinkData[`strIngredient${i}`]
        drinkUl.appendChild(ingredient)
    }

    drinkGlass.textContent = `Glass type: ${drinkData.strGlass}`
    drinkImg.src = drinkData.strDrinkThumb
    drinkImg.alt = drinkData.strDrink
    drinkInst.textContent = `Instructions: ${drinkData.strInstructions}`
    drinkCategory.textContent = `This is a ${drinkData.strCategory}`
    drinkName.textContent = `Name: ${drinkData.strDrink}`

    drinkUl.append(drinkInst, drinkGlass, drinkImg, drinkCategory)

    // const ingredient1 = document.createElement('ul')
    // const ingredient2 = document.createElement('ul')
    // const ingredient3 = document.createElement('ul')
    // const ingredient4 = document.createElement('ul')
    // const ingredient5 = document.createElement('ul')
    // const ingredient6 = document.createElement('ul')
    // const ingredient7 = document.createElement('ul')
    // const ingredient8 = document.createElement('ul')
    // const measure1 = document.createElement('ul')
    // const measure2 = document.createElement('ul')
    // const measure3 = document.createElement('ul')
    // const measure4 = document.createElement('ul')
    // const measure5 = document.createElement('ul')
    // const measure6 = document.createElement('ul')
    // const measure7 = document.createElement('ul')
    // const measure8 = document.createElement('ul')
    // if (drinkData === null) {
    //     drinkUl.textContent = ''
    // }

     // if ( typeof(drinkData) === "null") {
    //     drinkUl.innerHTML = ''
    // }
    // ingredient1.textContent = drinkData.strIngredient1
    // ingredient2.textContent = drinkData.strIngredient2
    // ingredient3.textContent = drinkData.strIngredient3
    // ingredient4.textContent = drinkData.strIngredient4
    // ingredient5.textContent = drinkData.strIngredient5
    // ingredient6.textContent = drinkData.strIngredient6
    // ingredient7.textContent = drinkData.strIngredient7
    // ingredient8.textContent = drinkData.strIngredient8
    // measure1.textContent = drinkData.strMeasure1
    // measure2.textContent = drinkData.strMeasure2
    // measure3.textContent = drinkData.strMeasure3
    // measure4.textContent = drinkData.strMeasure4
    // measure5.textContent = drinkData.strMeasure5
    // measure6.textContent = drinkData.strMeasure6
    // measure7.textContent = drinkData.strMeasure7
    // measure8.textContent = drinkData.strMeasure8
    // ingredient1.textContent=  `${drinkData.strMeasure1}``${drinkData.strIngredient1}`
    // ingredient2.textContent = `${drinkData.strMeasure2}``${drinkData.strIngredient2}`
    // ingredient3.textContent = `${drinkData.strMeasure3}``${drinkData.strIngredient3}`
    // ingredient4.textContent = `${drinkData.strMeasure4}``${drinkData.strIngredient4}`
    // ingredient5.textContent = `${drinkData.strMeasure5}``${drinkData.strIngredient5}`
    // ingredient6.textContent = `${drinkData.strMeasure6}``${drinkData.strIngredient6}`
    // ingredient7.textContent = `${drinkData.strMeasure7}``${drinkData.strIngredient7}`
    // ingredient8.textContent = `${drinkData.strMeasure8}``${drinkData.strIngredient8}`

     //     ingredient1, ingredient2, ingredient3, ingredient4, ingredient5,  ingredient6,  ingredient7,  ingredient8,
        //     measure1, measure2, measure3, measure4, measure5, measure6, measure7, measure8,

}



// DRINK RANDOMIZER


const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

const randomizerDiv = document.getElementById('random-drink');
const rButton = document.getElementById('random-btn');


const getRandomDrink = () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(drink => {
            console.log(drink)
            // rDrinkImg.style.visibility = 'visible'
            renderDrink(drink)
            // displayDrink()
        })

}

randomizerDiv.style.display = "none"

const renderDrink = (drink) => {

    drink.drinks.forEach(displayRDrink)
}

const displayRDrink = (drink) => {

    

    const rDrinkName = document.createElement('name')
    const rDrinkImg = document.createElement('img')

    for (let i = 1; i < 16; i++) {


        if (drink[`strIngredient${i}`] == null) {
            break
        }

        const rIngredient = document.createElement('h1')

        // rIngredient.textContent = drink[`strMeasure${i}`] + drink[`strIngredient${i}`]
        rIngredient.textContent = "Hi"

        randomizerDiv.append(rIngredient)

        console.log(drink[`strMeasure${i}`])

    }

    randomizerDiv.innerHTML = ''

    rDrinkName.textContent = drink.strDrink
    rDrinkName.id = 'drink-name'
    rDrinkImg.src = drink.strDrinkThumb
    rDrinkImg.alt = drink.strDrink
    randomizerDiv.append(rDrinkName, rDrinkImg)

    // rButton.addEventListener('click', () => {

    //  if (randomizerDiv.style.display === "none") {
    //     randomizerDiv.style.display = "block";
    //   } else {
    //     randomizerDiv.style.display = "none";
    
    // } getRandomDrink()
    
    //    } )
}
    rButton.addEventListener('click', () => {

     if (randomizerDiv.style.display === "none") {
        randomizerDiv.style.display = "block";
      } else {
        randomizerDiv.style.display = "none";
    
    } getRandomDrink()
    
       } )

// rDrinkImg.style.visibility = 'block'
// console.log(drink.strDrink)
const init = () => {

    getRandomDrink()
    setTimeout(() => {alert('Please confirm you are over 21 years of age.')
    
}, 1000);

}

init()
