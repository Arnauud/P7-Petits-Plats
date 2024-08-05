import { createDropdownItems } from "./dropdownProcessing.js";

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

    addItem(item, mainRecipeContainer, dropdownMenu, items, recipes);
    updateSelectedItemsLog();
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
    console.log('Created remove button for the selected item.');

    removeButton.addEventListener('click', () => {
        removeItem(item, selectedItemElement, mainRecipeContainer, dropdownMenu, items, recipes);
    });

    selectedItemElement.appendChild(removeButton);
    mainRecipeContainer.insertBefore(selectedItemElement, mainRecipeContainer.firstChild);
    console.log(`Inserted selected item element into container: ${item}`);
}

////////////////////////////////////////////////////////////
// Function to remove a selected item
////////////////////////////////////////////////////////////
export function removeItem(item, selectedItemElement, mainRecipeContainer, dropdownMenu, items, recipes) {
    console.log(`Remove button clicked for item: ${item}`);
    mainRecipeContainer.removeChild(selectedItemElement);
    console.log(`Removed selected item element from container: ${item}`);

    items.push(item);
    console.log(`Item pushed back to items array: ${items}`);

    createDropdownItems(items, dropdownMenu);
    console.log(`Dropdown menu updated with items: ${items}`);

    updateSelectedItemsLog();
}

////////////////////////////////////////////////////////////
// Function to log selected items
////////////////////////////////////////////////////////////
export function updateSelectedItemsLog() {
    const selectedItems = Array.from(document.querySelectorAll('.selected-item'))
        .map(el => el.childNodes[0].textContent.trim());
    console.log(`These are the items that are in the list right now: ${selectedItems.join(', ')}`);

}
//////////////////////////////////////////////////////////////////////