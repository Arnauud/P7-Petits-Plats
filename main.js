import { recipes } from './assets/data/recipes.js';
import { initializeDropdowns } from './Filter/dropDown.js';
import { displayRecipes } from './RecipeCard/displayRecipe.js';
import { searchRecipes } from './mainSearch.js';

function setupDropdownEventListeners(recipes) {
    console.log('Recipes passed to setupDropdownEventListeners:', recipes);

    const dropdownMenu = document.getElementById('someDropdownMenu');
    const items = ['item1', 'item2', 'item3']; // Example items

    dropdownMenu.addEventListener('click', (event) => {
        const item = event.target.textContent.trim();
        console.log('Dropdown item clicked:', item);
        handleItemSelected(item, dropdownMenu, items, recipes);
    });
}

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

