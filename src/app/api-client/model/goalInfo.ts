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

export interface GoalInfo { 
    id: number;
    rank: number;
    name?: string;
    problem?: string;
    dueDate: Date;
    closedDate: Date;
    status?: string;
    overdue: boolean;
    closed: boolean;
}