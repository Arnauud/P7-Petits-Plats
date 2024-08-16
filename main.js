import { recipes } from './assets/data/recipes.js';
import { initializeDropdowns } from './Filter/dropDown.js';
import { displayRecipes } from './RecipeCard/displayRecipe.js';
import { searchRecipes } from './mainSearch.js';
import { updateSelectedItemsLog } from './iteration/itemHandlerProcessing.js';

console.log('Initial recipes from Main.js:', recipes);
console.log('HELLLO I AM HERE !!!!!!!!!!!!!!', recipes)
displayRecipes(recipes);
initializeDropdowns(recipes);
updateSelectedItemsLog(recipes)

document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('research').value;
    console.log('Search button clicked with search term:', searchTerm);
    const searchResults = searchRecipes(searchTerm, recipes);
    console.log('Search results:', searchResults);
    displayRecipes(searchResults);
});

document.getElementById('research').addEventListener('input', () => {
    const searchTerm = document.getElementById('research').value;
    console.log('Search input changed, current search term:', searchTerm);
    const searchResults = searchRecipes(searchTerm, recipes);
    console.log('Search results input:', searchResults);
    console.log('Search results array list:', recipes);
    displayRecipes(searchResults);
});