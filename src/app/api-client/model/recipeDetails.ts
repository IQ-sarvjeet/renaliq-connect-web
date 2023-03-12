/**
 * Somatus Patient Portal API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 6.0.7.0-23-03-09-18-54
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IngredientInfo } from './ingredientInfo';
import { NutritionInfo } from './nutritionInfo';

export interface RecipeDetails { 
    id?: string;
    categoryId?: string;
    title?: string;
    procedure?: string;
    imageUrl?: string;
    serving: number;
    isCkd: boolean;
    isEskd: boolean;
    nutritions?: Array<NutritionInfo>;
    ingredients?: Array<IngredientInfo>;
    isFavorite: boolean;
}