import { createDropdownItems, extractUniqueItems } from '../iteration/dropdownProcessing.js';
import { displayRecipes } from '../RecipeCard/displayRecipe.js';

let ingredientItems = [];
let applianceItems = [];
let utensilItems = [];

export function initializeDropdowns(recipes) {
    document.addEventListener('DOMContentLoaded', () => {
        const filterContainer = document.querySelector('.filter');
        const ingredientDropdown = filterContainer.querySelector('#ingredientDropdownButton + .dropdown-menu');
        const applianceDropdown = filterContainer.querySelector('#applianceDropdownButton + .dropdown-menu');
        const utensilDropdown = filterContainer.querySelector('#utensilDropdownButton + .dropdown-menu');

        const { allIngredients, allAppliances, allUtensils } = extractUniqueItems(recipes);

        ingredientItems = [...allIngredients];
        applianceItems = [...allAppliances];
        utensilItems = [...allUtensils];

        createDropdownItems(ingredientItems, ingredientDropdown);
        createDropdownItems(applianceItems, applianceDropdown);
        createDropdownItems(utensilItems, utensilDropdown);

        const ingredientSearchInput = ingredientDropdown.querySelector('.dropdown-search');
        const applianceSearchInput = applianceDropdown.querySelector('.dropdown-search');
        const utensilSearchInput = utensilDropdown.querySelector('.dropdown-search');

        if (ingredientSearchInput) {
            ingredientSearchInput.addEventListener('input', function() {
                // displayRecipes(recipes, ingredientItems)
            });
        }

        if (applianceSearchInput) {
            applianceSearchInput.addEventListener('input', function() {
                displayRecipes(applianceSearchInput, applianceItems, applianceDropdown);
            });
        }

        if (utensilSearchInput) {
            utensilSearchInput.addEventListener('input', function() {
                displayRecipes(utensilSearchInput, utensilItems, utensilDropdown);
            });
        }
        });
    };
