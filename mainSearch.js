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