// DOM ELEMENTS
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const resultContainer = document.getElementById("result-container");
const errorContainer = document.getElementById("error-container");
const errorText = document.getElementById("error-text");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");
const errorHeading = document.getElementById("error-heading");
const searchTerm = document.getElementById("search-term");

// API
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

// EVENT LISTENERS
searchBtn.addEventListener("click", searchMeals)
mealsContainer.addEventListener("click", handleMealClick);
backBtn.addEventListener("click", () => {
    mealDetails.classList.add("hidden")
    mealsContainer.classList.remove("hidden")
})
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") searchMeals();
})

// FUNCTIONS
async function searchMeals() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        errorText.textContent = "Please enter a search term.";
        errorContainer.classList.remove("hidden");
        resultContainer.classList.add("hidden");
        return;
    }

    try {
        resultContainer.classList.remove("hidden");
        resultHeading.classList.remove("result-loaded");
        resultHeading.textContent = `Searching...`;
        mealsContainer.innerHTML = "";
        errorContainer.classList.add("hidden");

        const res = await fetch(`${SEARCH_URL}${searchTerm}`)
        const data = await res.json();

        if (data.meals === null) {
            resultContainer.classList.add("hidden");
            errorContainer.classList.remove("hidden");
            errorText.textContent = "Try again with another search term.";
        } else {
            // resultHeading.textContent = `Top ${searchTerm} recipes`;
            resultHeading.innerHTML = `Top ‎ <b id="search-term">${searchTerm}</b>‎  recipes`;
            resultHeading.classList.add("result-loaded");
            displayMeals(data.meals)
            searchInput.value = "";
        }
    } catch (e) {
        resultContainer.classList.add("hidden");
        errorContainer.classList.remove("hidden");
        errorHeading.textContent = 'Something went wrong.';
        errorText.textContent = 'Please try again later.';
    }
}

function displayMeals(meals) {
    mealsContainer.innerHTML = "";
    meals.forEach((meal) => {
        mealsContainer.innerHTML += `
      <div class="meal" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
          <h3 class="meal-title">${meal.strMeal}</h3>
          ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
        </div>
      </div>
    `;
    });
}

async function handleMealClick(e) {
    const mealEl = e.target.closest(".meal");
    if (!mealEl) return;
    const mealId = mealEl.getAttribute("data-meal-id");

    try {
        const res = await fetch(`${LOOKUP_URL}${mealId}`)
        const data = await res.json()
        if (data.meals && data.meals[0]) {
            const meal = data.meals[0];
            const ingredients = []

            for (let i = 0; i <= 20; i++) {
                if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
                    ingredients.push({
                        ingredient: meal[`strIngredient${i}`],
                        measure: meal[`strMeasure${i}`],
                    });
                }
            }
            mealDetailsContent.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-details-img">
        <h2 class="meal-details-title">${meal.strMeal}</h2>
        <div class="meal-details-category">
          <span>${meal.strCategory || "Uncategorized"}</span>
        </div>
        <div class="meal-details-ingredients">
          <h3>Ingredients</h3>
          <ul class="ingredients-list">
            ${ingredients.map((item) => `
              <li><i class="fas fa-check-circle"></i> ${item.measure} ${item.ingredient}</li>
            `).join("")}
          </ul>
        </div>
        <div class="meal-details-instructions">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>
        </div>
        ${meal.strYoutube ? `
          <a href="${meal.strYoutube}" target="_blank" class="youtube-link">
            Watch tutorial on ‎ <span><i class="fab fa-youtube"></i>Youtube</span>
          </a>
        ` : ""}
            `
            mealDetails.classList.remove("hidden");
            mealsContainer.classList.add("hidden");
        }
    } catch (e) {
        errorContainer.classList.remove("hidden");
        errorHeading.textContent = 'Something went wrong.';
        errorText.textContent = 'Please try again later.';
    }
}