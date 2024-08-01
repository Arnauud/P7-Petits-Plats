import { createDropdownItems, extractUniqueItems } from '../iteration/dropdownProcessing.js';
import { displayRecipes } from '../RecipeCard/displayRecipe.js';

let ingredientItems = [];
let applianceItems = [];
let utensilItems = [];

export function initializeDropdowns(recipes) {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed');
        const filterContainer = document.querySelector('.filter');
        console.log('Filter container:', filterContainer);
        
        const ingredientDropdown = filterContainer.querySelector('#ingredientDropdownButton + .dropdown-menu');
        console.log('Ingredient dropdown:', ingredientDropdown);
        
        const applianceDropdown = filterContainer.querySelector('#applianceDropdownButton + .dropdown-menu');
        console.log('Appliance dropdown:', applianceDropdown);
        
        const utensilDropdown = filterContainer.querySelector('#utensilDropdownButton + .dropdown-menu');
        console.log('Utensil dropdown:', utensilDropdown);

        const { allIngredients, allAppliances, allUtensils } = extractUniqueItems(recipes);
        console.log('Extracted unique items:', { allIngredients, allAppliances, allUtensils });

        ingredientItems = [...allIngredients];
        applianceItems = [...allAppliances];
        utensilItems = [...allUtensils];
        console.log('Initialized ingredientItems:', ingredientItems);
        console.log('Initialized applianceItems:', applianceItems);
        console.log('Initialized utensilItems:', utensilItems);

        createDropdownItems(ingredientItems, ingredientDropdown);
        console.log('Created ingredient dropdown items');
        
        createDropdownItems(applianceItems, applianceDropdown);
        console.log('Created appliance dropdown items');
        
        createDropdownItems(utensilItems, utensilDropdown);
        console.log('Created utensil dropdown items');

        const ingredientSearchInput = ingredientDropdown.querySelector('.dropdown-search');
        console.log('Ingredient search input:', ingredientSearchInput);
        
        const applianceSearchInput = applianceDropdown.querySelector('.dropdown-search');
        console.log('Appliance search input:', applianceSearchInput);
        
        const utensilSearchInput = utensilDropdown.querySelector('.dropdown-search');
        console.log('Utensil search input:', utensilSearchInput);

        if (ingredientSearchInput) {
            ingredientSearchInput.addEventListener('input', function() {
                console.log('Ingredient search input changed');
                displayRecipes(recipes, ingredientItems);
            });
        }

        if (applianceSearchInput) {
            applianceSearchInput.addEventListener('input', function() {
                console.log('Appliance search input changed');
                displayRecipes(applianceSearchInput, applianceItems, applianceDropdown);
            });
        }

        if (utensilSearchInput) {
            utensilSearchInput.addEventListener('input', function() {
                console.log('Utensil search input changed');
                displayRecipes(utensilSearchInput, utensilItems, utensilDropdown);
            });
        }
    });
};

