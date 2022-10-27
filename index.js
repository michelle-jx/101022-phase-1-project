//Creating the Form and search.

let hasOneIngredient = [];
let uniqueOneIngredientDrinks = [];
// let hasTwoIngredients = [];
// let hasThreeIngredients = [];
// let hasFourIngredients = [];
// let hasFiveIngredients = [];
const foundDrinksList = document.getElementById('you-have-ingredients-list')
const listHeader = document.createElement('ul')
listHeader.textContent = "Drinks with More than One Ingredient"
foundDrinksList.append(listHeader)
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
        hasOneIngredient = []
        uniqueOneIngredientDrinks = []
        e.preventDefault()
//after this submit we need to clear out the counting variables. Otherwise it
//will double count things is you submit new ingredients.
        for (i = 0; i < 5; i++) {
            enteredCocktailIngredients.push(e.target[i].value)
        }
        console.log(enteredCocktailIngredients)
        searchIngredients(enteredCocktailIngredients)
    })
}
function searchIngredients(ingrSearchArray) {
    console.log("Search Ingredients is running");
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t')
        .then(res => res.json())
        .then(drinkData => {
            //console.log(drinkData)
            drinkData.drinks.forEach((singleDrinkData) => {
                getCocktailIngredients(singleDrinkData, ingrSearchArray)
            })
            getUniqueOneIngredientDrinks(hasOneIngredient)
        })
}
function getCocktailIngredients(singleDrinkData, ingrSearchArray) {
// If we had time it might be better to create an object that had the name of the
// drink and the number of ingredients that it has. Then we could use that info to
// determine if we had all of the ingredients.
// Also, it would be good to have the matches all be switched to toUpperCase or something
// because the API is not consistent with how it enters the data.
    for (i = 0; i < 5; i++) {
        //console.log(ingrSearchArray[i])
        //console.log(singleDrinkData[`strIngredient${i+1}`])
        for (j = 1; j < 6; j++) {
            if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
            else if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
        }
    }
    console.log('getCocktailIngredients ran')
    console.log(hasOneIngredient)
}
function getUniqueOneIngredientDrinks(hasOneIngredient){
    let uniqueOneIngredientDrinks = [...new Set(hasOneIngredient)]
    console.log(uniqueOneIngredientDrinks)
    howManyIngredientsPerDrink(hasOneIngredient, uniqueOneIngredientDrinks)
}
function howManyIngredientsPerDrink(hasOneIngredient, uniqueOneIngredientDrinks) {
for (i=0; i<uniqueOneIngredientDrinks.length; i++){
    //can I make this an object where the key is the name and the value is the # of ingredients that match?
    let ingredientCount = 0
    hasOneIngredient.forEach(drink => {
        if (drink === uniqueOneIngredientDrinks[i]) {
            ingredientCount += 1;
        }
        })
        // Maybe add a switch here that puts the different results into the
        // hasXingredients arrays so can more easily access that info?
        if (ingredientCount > 1) {
            const drinkToMake = document.createElement('li')
            drinkToMake.textContent = uniqueOneIngredientDrinks[i] + ' has '+ ingredientCount +' ingredients'
            listHeader.append(drinkToMake)
        }
        console.log(uniqueOneIngredientDrinks[i] + ' has '+ ingredientCount +' ingredients')
    }
}

//Dislay drink Information

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t')
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

        ingredient.innerHTML = drinkData[`strIngredient${i}`] +  drinkData[`strMeasure${i}`]
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

    const rDrinkInst = document.createElement('p')

    randomizerDiv.innerHTML = ''

    rDrinkInst.textContent = drink.strInstructions
    rDrinkName.textContent = drink.strDrink
    rDrinkName.id = 'drink-name'
    rDrinkImg.src = drink.strDrinkThumb
    rDrinkImg.alt = drink.strDrink
    randomizerDiv.append(rDrinkName, rDrinkImg, rDrinkInst)

    for (let i = 1; i < 16; i++) {

        if (drink[`strMeasure${i}`] == null ) {
            break
        }else if (drink[`strIngredient${i}`]== null ) {
            break
        }

        const rIngredient = document.createElement('p')

        rIngredient.textContent = drink[`strIngredient${i}`] +  drink[`strMeasure${i}`]  
        randomizerDiv.appendChild(rIngredient)

        // console.log(drink)
    }

}

rButton.addEventListener('click', () => {

    if (randomizerDiv.style.display === "none") {
        randomizerDiv.style.display = "block";
    } else {
        randomizerDiv.style.display = "none";

    } getRandomDrink()

})

// console.log(drink.strDrink)


const like = document.getElementById('like');
const dislike = document.getElementById('dislike')

const likeBtn = () => {

    like.style.color = "blue";
    dislike.style.color = "grey";

}

const dislikeBtn = () => {
 
    dislike.style.color = "blue";
    like.style.color = "grey";
}

const init = (drink) => {

    getRandomDrink()

    //     setTimeout(() => {alert('Please confirm you are over 21 years of age.')

    // }, 1000);

}

init()