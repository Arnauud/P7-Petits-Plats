import { recipes } from './assets/data/recipes.js';
import { initializeDropdowns } from './Filter/dropDown.js';
import { displayRecipes } from './RecipeCard/displayRecipe.js';
import { searchRecipes } from './mainSearch.js';

console.log('Initial recipes:', recipes);

displayRecipes(recipes);
initializeDropdowns(recipes);

console.log('Dropdowns initialized with recipes.');

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
    console.log('Search results:', searchResults);
    displayRecipes(searchResults);
});

// Event listener for tags container
const tagContainer = document.getElementById('tag');
if (tagContainer) {
    console.log('Tag container found:', tagContainer);
    tagContainer.addEventListener('click', (event) => {
        console.log('Tag container clicked:', event.target);
        if (event.target.classList.contains('selected-item')) {
            console.log('Tag clicked:', event.target.textContent);

            // Collect all selected tags
            const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
                .map(el => el.textContent.trim());
            console.log('All selected items:', selectedItems);

            // Filter recipes based on selected items

            const searchResults = searchRecipes(selectedItems, recipes);
            console.log('Search results:', searchResults);
            displayRecipes(searchResults);

            // const filteredRecipes = recipes.filter(recipe => {
            //     return selectedItems.every(item =>
            //         recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === item.toLowerCase()) ||
            //         recipe.appliance.toLowerCase() === item.toLowerCase() ||
            //         recipe.utensils.some(utensil => utensil.toLowerCase() === item.toLowerCase())
            //     );
            // });

            // console.log('Filtered recipes based on selected tags:', filteredRecipes);
            // displayRecipes(filteredRecipes);
        }
    });
} else {
    console.error('Tag container not found.');
}