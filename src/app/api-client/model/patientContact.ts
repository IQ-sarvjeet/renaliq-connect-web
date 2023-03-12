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

export interface PatientContact { 
    contactId: number;
    ccaContactId: number;
    ccaPatientId: number;
    contactTypeId?: number;
    preferredContactMethodId: number;
    name?: string;
    gender?: string;
    mobilePhone?: string;
    workPhone?: string;
    emailId?: string;
    address?: string;
    city?: string;
    zipcode?: string;
    isActive?: number;
    isPrimary?: number;
    isUpdated?: number;
    prefferedContactDaytime?: string;
    createdOn?: Date;
    createdBy?: string;
    updatedOn?: Date;
    updatedBy?: string;
    stateCode?: string;
}