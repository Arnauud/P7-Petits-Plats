export function searchRecipes(query, recipes) {
    console.log('THIS IS A CONSOLE LOG !!!!!!!!!!!!!!', query);
    console.log('searchRecipes called with:', { query, recipes });
    query = query[0]
    console.log(`this is the type of`,typeof(query))
    // Ensure the query is a string
    if (typeof query !== 'string') {
        query = '';
    }
    
    query = query.toLowerCase();
    console.log('Converted query to lowercase:', query);

    return recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query));
        const applianceMatch = recipe.appliance.toLowerCase().includes(query);
        const utensilMatch = recipe.ustensils.some(ut => ut.toLowerCase().includes(query));

        return nameMatch || ingredientMatch || applianceMatch || utensilMatch;
    });
}




//// Full Rework, wiht for Loop /////

// export function searchRecipes(query, recipes) {
//     console.log('THIS IS A CONSOLE LOG !!!!!!!!!!!!!!', query);
//     console.log('searchRecipes called with:', { query, recipes });

//     // Initialize an empty array to store the results
//     let results = [];

//     // Loop through each item in the query array
//     for (let i = 0; i < query.length; i++) {
//         let item = query[i];
//         console.log(`Processing item in MAINSEARCH ${i}:`, item);

//         // Ensure the item is a string
//         if (typeof item !== 'string') {
//             item = '';
//         }

//         item = item.toLowerCase();
//         console.log('Converted item to lowercase:', item);

//         // Filter recipes based on the current item
//         const filteredRecipes = recipes.filter(recipe => {
//             const nameMatch = recipe.name.toLowerCase().includes(item);
//             const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(item));
//             const applianceMatch = recipe.appliance.toLowerCase().includes(item);
//             const utensilMatch = recipe.ustensils.some(ut => ut.toLowerCase().includes(item));

//             return nameMatch || ingredientMatch || applianceMatch || utensilMatch;
//         });

//         // Add filtered recipes to the results array
//         results = results.concat(filteredRecipes);
//     }

//     // Return the unique results by filtering out duplicates
//     return [...new Set(results)];
// }