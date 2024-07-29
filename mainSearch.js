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
