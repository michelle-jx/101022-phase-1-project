//Creating the Form and search.


let hasOneIngredient = [];
let uniqueOneIngredientDrinks = [];

const foundDrinksList = document.getElementById('you-have-ingredients-list')
const listHeader = document.createElement('ul')

foundDrinksList.append(listHeader)

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
    submitButton.style.cursor = 'pointer';

    somethingToGrab.append(ingredientsForm)
    ingredientsForm.append(getFirstIngredient, getSecondIngredient, getThirdIngredient,
        getFourthIngredient, getFifthIngredient, submitButton);

    let enteredCocktailIngredients = []

    ingredientsForm.addEventListener('submit', (e) => {

        e.preventDefault()

        hasOneIngredient = []
        uniqueOneIngredientDrinks = []
        enteredCocktailIngredients = []

        listHeader.textContent = ''


        for (i = 0; i < 5; i++) {

            enteredCocktailIngredients.push(e.target[i].value)
        }

        searchIngredients(enteredCocktailIngredients)

    })
}
function searchIngredients(ingrSearchArray) {

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
        .then(res => res.json())
        .then(drinkData => {
           
            drinkData.drinks.forEach((singleDrinkData) => {

                getCocktailIngredients(singleDrinkData, ingrSearchArray)
            })

            getUniqueOneIngredientDrinks(hasOneIngredient)

        })
}
function getCocktailIngredients(singleDrinkData, ingrSearchArray) {
 
    for (i = 0; i < 5; i++) {
       
        for (j = 1; j < 6; j++) {

            if (ingrSearchArray[i] === singleDrinkData[`strIngredient${j}`]) {
                hasOneIngredient.push(singleDrinkData.strDrink)
            }
        }
    }

}
function getUniqueOneIngredientDrinks(hasOneIngredient) {

    let uniqueOneIngredientDrinks = [...new Set(hasOneIngredient)]
    
    if (hasOneIngredient.length === 0 || uniqueOneIngredientDrinks.length === hasOneIngredient.length) {
        const notEnoughIngredients = document.createElement('ul')
        notEnoughIngredients.textContent = `You don't have enough ingredients for any of these drinks. Try Again.`
        listHeader.append(notEnoughIngredients)
    }
   
    howManyIngredientsPerDrink(hasOneIngredient, uniqueOneIngredientDrinks)
}

function howManyIngredientsPerDrink(hasOneIngredient, uniqueOneIngredientDrinks) {

    for (i = 0; i < uniqueOneIngredientDrinks.length; i++) {
      
        let ingredientCount = 0

        hasOneIngredient.forEach(drink => {

            if (drink === uniqueOneIngredientDrinks[i]) {

                ingredientCount += 1;
            }
        })
     
        if (ingredientCount > 1) {

            const drinkToMake = document.createElement('ul')

            drinkToMake.textContent = 'You have ' + ingredientCount + ' ingredients' + ' for a ' + uniqueOneIngredientDrinks[i]

            listHeader.append(drinkToMake)
        }
       
    }
}

//Dislay drink Information

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b')
    .then(res => res.json())
    .then(drinkData => {
        renderDrinks(drinkData)
    })

const renderDrinks = (drinkData) => {
    drinkData.drinks.forEach(displayDrinks)

}

const drinkUl = document.getElementById('name-list')

const displayDrinks = (drinkData) => {


    const drinkName = document.createElement('h2')
    const drinkInst = document.createElement('p')
    const drinkCategory = document.createElement('h3')
    const drinkGlass = document.createElement('h4')
    const drinkImg = document.createElement('img')
    const likeBtn = document.createElement('i')
    const disLikeBtn = document.createElement('i')

    likeBtn.className = "fa-solid fa-thumbs-up"
    likeBtn.id = "like"
    disLikeBtn.className = "fa-solid fa-thumbs-down"
    disLikeBtn.id = "dislike"
    likeBtn.style.color = "grey";
    disLikeBtn.style.color = "grey";

    const like = () => {
        likeBtn.style.color = "blue";
        disLikeBtn.style.color = "grey"

    }

    const dislike = () => {

        disLikeBtn.style.color = "red";
        likeBtn.style.color = "grey";


    }

    likeBtn.addEventListener("click", like)

    disLikeBtn.addEventListener("click", dislike)


    drinkUl.append(drinkName)
    for (let i = 1; i < 16; i++) {


        if (drinkData[`strIngredient${i}`] == null) {
            break
        }


        const ingredient = document.createElement('ul')

        ingredient.innerHTML = drinkData[`strIngredient${i}`] + drinkData[`strMeasure${i}`]
        drinkUl.appendChild(ingredient)
    }


    drinkGlass.textContent = `Glass type: ${drinkData.strGlass}`
    drinkImg.src = drinkData.strDrinkThumb
    drinkImg.alt = drinkData.strDrink
    drinkInst.textContent = `Instructions: ${drinkData.strInstructions}`
    drinkCategory.textContent = `This is a ${drinkData.strCategory}`
    drinkName.textContent = `Name: ${drinkData.strDrink}`

    drinkUl.append(drinkInst, drinkGlass, drinkImg, drinkCategory, likeBtn, disLikeBtn)

}


// DRINK RANDOMIZER

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

const randomizerDiv = document.getElementById('random-drink');
const rButton = document.getElementById('random-btn');

const getRandomDrink = () => {

    fetch(API_URL)
        .then(res => res.json())
        .then(drink => {

            renderDrink(drink)

        })

}

randomizerDiv.style.display = "none";

const renderDrink = (drink) => {

    drink.drinks.forEach(displayRDrink)

}

const displayRDrink = (drink) => {

    const rDrinkName = document.createElement('name')
    const rDrinkImg = document.createElement('img')
    const rDrinkInst = document.createElement('p')
    const likeBtn = document.createElement('i')
    const disLikeBtn = document.createElement('i')

    likeBtn.className = "fa-solid fa-thumbs-up"
    likeBtn.id = "like"
    disLikeBtn.className = "fa-solid fa-thumbs-down"
    disLikeBtn.id = "dislike"
    likeBtn.style.color = "grey";
    disLikeBtn.style.color = "grey";


    likeBtn.style.fontSize

    const like = () => {

        likeBtn.style.color = "blue";
        disLikeBtn.style.color = "grey"

    }

    const dislike = () => {

        disLikeBtn.style.color = "red";
        likeBtn.style.color = "grey";


    }

    likeBtn.addEventListener("click", like)
    disLikeBtn.addEventListener("click", dislike)

    randomizerDiv.innerHTML = ''

    rDrinkInst.textContent = drink.strInstructions
    rDrinkName.textContent = drink.strDrink
    rDrinkName.id = 'drink-name'
    rDrinkImg.src = drink.strDrinkThumb
    rDrinkImg.alt = drink.strDrink

    randomizerDiv.append(rDrinkName, rDrinkImg, rDrinkInst, likeBtn, disLikeBtn)

    for (let i = 1; i < 16; i++) {

        if (drink[`strMeasure${i}`] == null) {
            break
        } else if (drink[`strIngredient${i}`] == null) {
            break
        }

        const rIngredient = document.createElement('p')

        rIngredient.textContent = drink[`strIngredient${i}`] + drink[`strMeasure${i}`]

        randomizerDiv.appendChild(rIngredient)
    }

}

rButton.addEventListener('click', () => {

    if (randomizerDiv.style.display === "none") {
        randomizerDiv.style.display = "block";
    } else {
        randomizerDiv.style.display = "none";

    } getRandomDrink()

})


const init = (drink) => {

    getRandomDrink()
    getEnteredIngredients();

        setTimeout(() => {alert('Please confirm you are 21 years of age or over.')

    }, 1000);

}

init()