export function searchRecipes(query, recipes) {
    query = query.toLowerCase();

    return recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query));
        const applianceMatch = recipe.appliance.toLowerCase().includes(query);
        const utensilMatch = recipe.ustensils.some(ut => ut.toLowerCase().includes(query));

        return nameMatch || ingredientMatch || applianceMatch || utensilMatch;
    });

}


// export function searchRecipes(query, recipes) {
//     console.log('searchRecipes called with:', { query, recipes });

//     // Convert the query to lowercase for case-insensitive comparison
//     query = query.toLowerCase();
//     console.log('Converted query to lowercase:', query);

//     // Filter the recipes array to include only recipes that match the query
//     const filteredRecipes = recipes.filter(recipe => {
//         console.log('Checking recipe:', recipe);

//         // Check if the recipe name includes the query string
//         const nameMatch = recipe.name.toLowerCase().includes(query);
//         console.log(`Name match for "${recipe.name}":`, nameMatch);

//         // Check if any of the recipe's ingredients include the query string
//         const ingredientMatch = recipe.ingredients.some(ing => {
//             const ingMatch = ing.ingredient.toLowerCase().includes(query);
//             console.log(`Ingredient match for "${ing.ingredient}":`, ingMatch);
//             return ingMatch;
//         });
//         console.log('Ingredient match:', ingredientMatch);

//         // Check if the recipe's appliance includes the query string
//         const applianceMatch = recipe.appliance.toLowerCase().includes(query);
//         console.log(`Appliance match for "${recipe.appliance}":`, applianceMatch);

//         // Check if any of the recipe's utensils include the query string
//         const utensilMatch = recipe.ustensils.some(ut => {
//             const utMatch = ut.toLowerCase().includes(query);
//             console.log(`Utensil match for "${ut}":`, utMatch);
//             return utMatch;
//         });
//         console.log('Utensil match:', utensilMatch);

//         // Return true if any of the above checks are true (i.e., the recipe matches the query)
//         const matches = nameMatch || ingredientMatch || applianceMatch || utensilMatch;
//         console.log(`Recipe "${recipe.name}" matches query "${query}":`, matches);
//         return matches;
//     });

//     console.log('Filtered recipes:', filteredRecipes);
//     return filteredRecipes;
// }