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

export interface LearningContentDetails { 
    id: string;
    title: string;
    description: string;
    categoryId: string;
    categoryName: string;
    type: string;
    duration: number;
    thumbNailURL: string;
    contentURL: string;
    publishedOn?: Date;
    isFaviroute: boolean;
}