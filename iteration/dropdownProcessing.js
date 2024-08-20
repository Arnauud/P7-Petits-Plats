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
export function createDropdownItems(items, dropdownMenu, recipes) {
    console.log('BEEEEEEEEEEPPPPPPPP');

    const searchField = dropdownMenu.querySelector('.dropdown-search');
    // console.log(`Search field found: ${searchField !== null}`);
    
    const searchFieldWrapper = searchField ? searchField.parentElement : null;
    // console.log(`Search field wrapper found: ${searchFieldWrapper !== null}`);

    dropdownMenu.innerHTML = "";
    // console.log('Cleared dropdown menu.');

    if (searchFieldWrapper) {
        dropdownMenu.appendChild(searchFieldWrapper);
        // console.log('Appended search field wrapper to dropdown menu.');
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
    console.log(`THIS IS ANOTHER BEEEEEP`, formattedItems);

    formattedItems.forEach(item => {
        // console.log(`Adding item to dropdown: ${item}`);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.textContent = item;
        a.addEventListener('click', () => {
            console.log(`Item clicked from dropdownProcessing: ${item}`);
            console.log(`THIS IS ANOTHER CHECK ${recipes}`);
            handleItemSelected(item, dropdownMenu, items, recipes);
            console.log(`Recipes clicked from dropdownProcessing.js: ${recipes}`);
        });
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });

    if (searchField) {
        searchField.focus();

        // Get all the dropdown search inputs
        const dropdownSearchInputs = document.querySelectorAll('.dropdown-search');
    
        // Attach an event listener to each input
        dropdownSearchInputs.forEach(input => {
            input.addEventListener('input', function () {
                const filter = this.value.toLowerCase();
                const dropdownMenu = this.closest('.dropdown-menu');
                const listItems = dropdownMenu.querySelectorAll('li');
    
                // Loop through all list items, and hide those who don't match the search query
                listItems.forEach(item => {
                    const text = item.textContent || item.innerText;
                    if (text.toLowerCase().includes(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
    
                // Add or remove 'show' class from clearButton based on input value
                const clearButton = document.getElementById('clearButton');
                if (this.value.length > 0) {
                    clearButton.classList.add('show');
                } else {
                    clearButton.classList.remove('show');
                }
            });
        });
        
        // Handle clear button click event
        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', function() {
            if (searchField) {
                searchField.value = ''; // Clear the input field
                searchField.dispatchEvent(new Event('input')); // Trigger input event to update the dropdown
            }
            clearButton.classList.remove('show'); // Hide the clear button
        });

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

// ////////////////////////////////////////////////////////////
// // Function to clear an input list
// ////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', function () {
//     const inputField = document.getElementById('inputField');
//     const clearButton = document.getElementById('clearButton');

//     // Function to check if the input field has at least one letter
//     function checkInput() {
//         const hasLetter = /[a-zA-Z]/.test(inputField.value);
//         console.log(hasLetter)
//         clearButton.style.display = hasLetter ? 'inline' : 'none';
//     }

//     // Function to clear all letters from the input field
//     function clearLetters() {
//         inputField.value = inputField.value.replace(/[a-zA-Z]/g, '');
//         checkInput(); // Update the button visibility
//     }

//     // Event listeners
//     inputField.addEventListener('input', checkInput);
//     clearButton.addEventListener('click', clearLetters);

//     // Initial check
//     checkInput();
// });