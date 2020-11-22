import { ADD_INGREDIENT, REMOVE_INGREDIENT} from '../constants'


export const addIngredient = (name) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
}