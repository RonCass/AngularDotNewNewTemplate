export class Address {
address1: string;
address2: string;
city: string;
stateId: number;
countryId: number;
zip: string;
 }

export class UserAndRoleOut {
id: string;
firstName: string;
lastName: string;
email: string;
roleId: number;
roleName: string;
 }

export class ApplicationUserOut {
id: number;
accessFailCount: number;
email: string;
emailConfirmed: boolean;
phoneNumber: string;
phoneNumberConfirmed: boolean;
twoFactorEnabled: boolean;
userName: string;
companyName: string;
firstName: string;
lastName: string;
isActive: boolean;
dateCreated: Date;
dateLastModified: Date;
 }

export class ApplicationRoleOut {
roleId: number;
roleName: string;
 }

export class APICrudExampleOut {
id: number;
field1: string;
field2: string;
 }

export class ApplicationUserIn {
accessFailCount: number;
email: string;
emailConfirmed: boolean;
phoneNumber: string;
phoneNumberConfirmed: boolean;
twoFactorEnabled: boolean;
userName: string;
companyName: string;
firstName: string;
lastName: string;
isActive: boolean;
password: string;
roleName: string;
 }

export class APICrudExampleIn {
field1: string;
field2: string;
 }

export class BaseEntity {
id: number;
isDeleted: boolean;
 }

export class State {
id: number;
abbreviation: string;
name: string;
 }

export class Log {
id: number;
message: string;
messageTemplate: string;
level: string;
timeStamp: Date;
exception: string;
logEvent: string;
userId: string;
requestPath: string;
sourceContext: string;
actionId: string;
actionName: string;
requestId: string;
 }

export class DummyData {
id: number;
col1: string;
col2: string;
col3: string;
 }

export class CredentialModel {
userName: string;
password: string;
 }

export class Country {
id: number;
abbreviation: string;
name: string;
 }

export class ApplicationUserRole {
 }

export class ApplicationUser {
companyName: string;
firstName: string;
lastName: string;
isActive: boolean;
dateCreated: Date;
dateLastModified: Date;
 }

export class ApplicationRoleManager {
 }

export class ApplicationRole {
 }

export class APICrudExample {
id: number;
field1: string;
field2: string;
 }

export class Application {
version: number;
dateCreated: Date;
dateLastModified: Date;
applicationNumber: string;
 }

export class PrimaryInfo {
siteNumber: string;
applicationName: string;
description: string;
 }

