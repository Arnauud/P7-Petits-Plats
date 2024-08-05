import { handleItemSelected } from "./itemHandlerProcessing.js";

function toLowerCaseItems(items) {
    return items.map(item => item.toLowerCase());
}

function removePluralOrXEnding(items) {
    return items.filter(item => !/[sx]$/.test(item));
}

function removeDuplicates(items) {
    return [...new Set(items)];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function sortItemsAlphabetically(items) {
    return items.sort((a, b) => a.localeCompare(b));
}

function formatItems(items) {
    return items.map(item => capitalizeFirstLetter(item));
}

////////////////////////////////////////////////////////////
// Function to createDropdownItems
////////////////////////////////////////////////////////////

export function createDropdownItems(items, dropdownMenu) {
    // console.log(`Initial items: ${items}`);

    const searchField = dropdownMenu.querySelector('.dropdown-search');
    console.log(`Search field found: ${searchField !== null}`);
    
    const searchFieldWrapper = searchField ? searchField.parentElement : null;
    console.log(`Search field wrapper found: ${searchFieldWrapper !== null}`);

    dropdownMenu.innerHTML = "";
    console.log('Cleared dropdown menu.');

    if (searchFieldWrapper) {
        dropdownMenu.appendChild(searchFieldWrapper);
        console.log('Appended search field wrapper to dropdown menu.');
    }

    console.log('Processing items...');
    const lowercasedItems = toLowerCaseItems(items);
    // console.log(`Lowercased items: ${lowercasedItems}`);

    const filteredItems = removePluralOrXEnding(lowercasedItems);
    // console.log(`Filtered items (removed plurals or 'x' endings): ${filteredItems}`);

    const uniqueItems = removeDuplicates(filteredItems);
    // console.log(`Unique items: ${uniqueItems}`);

    const sortedItems = sortItemsAlphabetically(uniqueItems);
    // console.log(`Sorted items alphabetically: ${sortedItems}`);

    const formattedItems = formatItems(sortedItems);
    // console.log(`Formatted items: ${formattedItems}`);

    formattedItems.forEach(item => {
        console.log(`Adding item to dropdown: ${item}`);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.textContent = item;
        a.addEventListener('click', () => {
            console.log(`Item clicked: ${item}`);
            handleItemSelected(item, dropdownMenu, items);
        });
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });

    if (searchField) {
        searchField.focus();
        console.log('Focused on search field.');
    }

    console.log('Dropdown items created.');
}

////////////////////////////////////////////////////////////
// Function to Unique list with no duplicate
////////////////////////////////////////////////////////////

export function extractUniqueItems(recipes) {
    const allIngredients = [];
    const allAppliances = [];
    const allUtensils = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient);
        });
        allAppliances.push(recipe.appliance);
        recipe.ustensils.forEach(utensil => {
            allUtensils.push(utensil);
        });
    });

    return {
        allIngredients: removeDuplicates(allIngredients),
        allAppliances: removeDuplicates(allAppliances),
        allUtensils: removeDuplicates(allUtensils)
    };
}