import { recipes } from "../assets/data/recipes";

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
// Function to handle item selection
////////////////////////////////////////////////////////////
export function handleItemSelected(item, dropdownMenu, items, recipes) {
    console.log('handleItemSelected called with:', { item, dropdownMenu, items, recipes });

    const updatedItems = items.filter(i => i.toLowerCase() !== item.toLowerCase());
    console.log(`Updated items after filtering: ${updatedItems}`);

    createDropdownItems(updatedItems, dropdownMenu);
    console.log(`Dropdown menu updated with items: ${updatedItems}`);

    const mainRecipeContainer = document.querySelector('.selected-items-container');
    console.log(`Main recipe container found: ${mainRecipeContainer !== null}`);

    if (!mainRecipeContainer) {
        console.error("Selected items container not found.");
        return;
    }

    const selectedItemElement = document.createElement('div');
    selectedItemElement.textContent = item;
    selectedItemElement.classList.add('selected-item');
    console.log(`Created selected item element for: ${item}`);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '✕';
    removeButton.classList.add('remove-button');
    console.log('Created remove button for the selected item.');

    removeButton.addEventListener('click', () => {
        console.log(`Remove button clicked for item: ${item}`);
        mainRecipeContainer.removeChild(selectedItemElement);
        console.log(`Removed selected item element from container: ${item}`);

        items.push(item);
        console.log(`Item pushed back to items array: ${items}`);

        createDropdownItems(items, dropdownMenu);
        console.log(`Dropdown menu updated with items: ${items}`);

        // Collect all selected items and filter recipes based on them
        const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
            .map(el => el.childNodes[0].textContent.trim());
        console.log(`Selected items after removing: ${selectedItems}`);
        
        if (Array.isArray(recipes)) {
            const filteredRecipes = filterRecipes(recipes, selectedItems);
            console.log(`Filtered recipes after removing:`, filteredRecipes);
            displayRecipes(filteredRecipes);
        } else {
            console.error('Recipes is not an array or is undefined:', recipes);
        }
    });

    selectedItemElement.appendChild(removeButton);
    mainRecipeContainer.insertBefore(selectedItemElement, mainRecipeContainer.firstChild);
    console.log(`Inserted selected item element into container: ${item}`);

    // Collect all selected items and filter recipes based on them
    const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
        .map(el => el.childNodes[0].textContent.trim());
    console.log(`Selected item: ${selectedItems}`);

    if (Array.isArray(recipes)) {
        const filteredRecipes = filterRecipes(recipes, selectedItems);
        console.log(`Filtered recipes for selected items ${selectedItems}:`, filteredRecipes);
        displayRecipes(filteredRecipes);
    } else {
        console.error('Recipes is not an array or is undefined:', recipes);
    }
}

// Helper function to filter recipes based on selected items
function filterRecipes(recipes, selectedItems) {
    console.log('Filtering recipes with selected items:', selectedItems);
    if (!Array.isArray(recipes)) {
        console.error('Recipes is not an array or is undefined:', recipes);
        return [];
    }
    const filtered = recipes.filter(recipe => {
        const hasAllItems = selectedItems.every(item =>
            recipe.ingredients.includes(item) ||
            recipe.appliances.includes(item) ||
            recipe.utensils.includes(item)
        );
        console.log(`Recipe "${recipe.name}" has all selected items (${selectedItems}): ${hasAllItems}`);
        return hasAllItems;
    });
    console.log('Filtered recipes result:', filtered);
    return filtered;
}


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