import { recipes } from './assets/data/recipes.js';
import { initializeDropdowns } from './Filter/dropDown.js';
import { displayRecipes } from './RecipeCard/displayRecipe.js';
import { searchRecipes } from './mainSearch.js';


displayRecipes(recipes);
initializeDropdowns(recipes);

// document.getElementById('searchButton').addEventListener('click', () => {
//     const searchTerm = document.getElementById('research').value;
//     const searchResults = searchRecipes(searchTerm, recipes);
//     displayRecipes(searchResults);
// });

document.getElementById('research').addEventListener('input', () => {
    const searchTerm = document.getElementById('research').value;
    const searchResults = searchRecipes(searchTerm, recipes);
    displayRecipes(searchResults);
});

