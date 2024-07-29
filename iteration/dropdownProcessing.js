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

export function createDropdownItems(items, dropdownMenu) {
    const searchField = dropdownMenu.querySelector('.dropdown-search');
    const searchFieldWrapper = searchField ? searchField.parentElement : null;

    dropdownMenu.innerHTML = "";

    if (searchFieldWrapper) {
        dropdownMenu.appendChild(searchFieldWrapper);
    }

    const lowercasedItems = toLowerCaseItems(items);
    const filteredItems = removePluralOrXEnding(lowercasedItems);
    const uniqueItems = removeDuplicates(filteredItems);
    const sortedItems = sortItemsAlphabetically(uniqueItems);
    const formattedItems = formatItems(sortedItems);

    formattedItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.textContent = item;
        a.addEventListener('click', () => handleItemSelected(item, dropdownMenu, items));
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });
    if (searchField) {
        searchField.focus();
    }
}


////////////////////////////////////////////////////////////
// Function to handle item selection
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
export function handleItemSelected(item, dropdownMenu, items) {
    const updatedItems = items.filter(i => i.toLowerCase() !== item.toLowerCase());
    createDropdownItems(updatedItems, dropdownMenu);

    const mainRecipeContainer = document.querySelector('.selected-items-container');

    if (!mainRecipeContainer) {
        console.error("Selected items container not found.");
        return;
    }

    const selectedItemElement = document.createElement('div');
    selectedItemElement.textContent = item;
    selectedItemElement.classList.add('selected-item');

    const removeButton = document.createElement('button');
    removeButton.textContent = '✕';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        mainRecipeContainer.removeChild(selectedItemElement);
        items.push(item);
        createDropdownItems(items, dropdownMenu);
    });

    selectedItemElement.appendChild(removeButton);
    mainRecipeContainer.insertBefore(selectedItemElement, mainRecipeContainer.firstChild);

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

