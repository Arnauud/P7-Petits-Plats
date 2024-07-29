import { creationRecipeCard } from "./creationRecipeCard.js";

export function displayRecipes(recipes) {
    const main = document.getElementById('mainRecipe');
    main.innerHTML = "";  // Clear existing recipes
    const recipeCounter = document.querySelector('.recipeCounter');

    if (!recipes || recipes.length === 0) {
        // main.innerHTML = '<p>No recipes found</p>';
        return;
    }

    let row = document.createElement('div');
    row.className = 'row';

    recipes.forEach((recipe, index) => {
        const recipeCardCol = document.createElement('div');
        recipeCardCol.className = 'col-md-4'; // 4 columns for each card to ensure 3 cards per row
        const recipeCard = creationRecipeCard(recipe);
        recipeCardCol.appendChild(recipeCard);
        row.appendChild(recipeCardCol);

        // After every third recipe, create a new row
        if ((index + 1) % 3 === 0) {
            main.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        }
    });

    // Append any remaining cards
    if (row.children.length > 0) {
        main.appendChild(row);
    }
    recipeCounter.textContent = `${recipes.length} RECETTE${recipes.length > 1 ? 'S' : ''}`;
}
