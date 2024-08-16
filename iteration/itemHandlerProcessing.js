import { recipes } from "../assets/data/recipes.js";
import { searchRecipes } from "../mainSearch.js";
import { displayRecipes } from "../RecipeCard/displayRecipe.js";
import { createDropdownItems } from "./dropdownProcessing.js";


document.addEventListener('DOMContentLoaded', () => {
    console.log('Imported recipes:', recipes); // This should log the imported recipes data

    // Call the function and pass the recipes data
    updateSelectedItemsLog(recipes);
});

// Call the function and pass the recipes data
updateSelectedItemsLog(recipes);
////////////////////////////////////////////////////////////
// Function to handle item selection
////////////////////////////////////////////////////////////
export function handleItemSelected(item, dropdownMenu, items, recipes) {
    console.log('handleItemSelected called with:', { item, dropdownMenu, items, recipes });

    const updatedItems = items.filter(i => i.toLowerCase() !== item.toLowerCase());
    // console.log(`Updated items after filtering: ${updatedItems}`);

    createDropdownItems(updatedItems, dropdownMenu);
    // console.log(`Dropdown menu updated with items: ${updatedItems}`);

    const mainRecipeContainer = document.querySelector('.selected-items-container');
    // console.log(`Main recipe container found: ${mainRecipeContainer !== null}`);

    if (!mainRecipeContainer) {
        // console.error("Selected items container not found.");
        return;
    }

    addItem(item, mainRecipeContainer, dropdownMenu, items, recipes);
    updateSelectedItemsLog(recipes);
}

////////////////////////////////////////////////////////////
// Function to add a new selected item
////////////////////////////////////////////////////////////
export function addItem(item, mainRecipeContainer, dropdownMenu, items, recipes) {
    const selectedItemElement = document.createElement('div');
    selectedItemElement.textContent = item;
    selectedItemElement.classList.add('selected-item');

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '✕';
    removeButton.classList.add('remove-button');
    // console.log('Created remove button for the selected item.');

    removeButton.addEventListener('click', () => {
        removeItem(item, selectedItemElement, mainRecipeContainer, dropdownMenu, items, recipes);
    });

    selectedItemElement.appendChild(removeButton);
    mainRecipeContainer.insertBefore(selectedItemElement, mainRecipeContainer.firstChild);
    // console.log(`Inserted selected item element into container: ${item}`);
}

////////////////////////////////////////////////////////////
// Function to remove a selected item
////////////////////////////////////////////////////////////
export function removeItem(item, selectedItemElement, mainRecipeContainer, dropdownMenu, items, recipes) {
    console.log(`Remove button clicked for item: ${item}`);
    mainRecipeContainer.removeChild(selectedItemElement);
    // console.log(`Removed selected item element from container: ${item}`);

    items.push(item);
    // console.log(`Item pushed back to items array: ${items}`);

    createDropdownItems(items, dropdownMenu);
    // console.log(`Dropdown menu updated with items: ${items}`);

    updateSelectedItemsLog(recipes);
}

////////////////////////////////////////////////////////////
// Function to log selected items
////////////////////////////////////////////////////////////
export function updateSelectedItemsLog(recipes) {
    console.log('Imported recipes:', recipes);
    const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
    .map(el => el.firstChild.textContent.trim());

    console.log(`Selected ingredients: ${selectedItems.join(', ')}`);
    console.log('Available recipes:', recipes);

    const matchingRecipes = searchRecipes(selectedItems, recipes);
    console.log('Matching recipes:', matchingRecipes);

    if (matchingRecipes.length === 0) {
        console.log('No matching recipes found.');
        return;
    }

    displayRecipes(matchingRecipes);
}

updateSelectedItemsLog(recipes)
