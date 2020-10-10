
export class TokenInfo {
  expiration: string;
  token: string;
  // username: string;
}
export interface APICrudExample {
  id: number;
  field1: string;
  field2: string;
}

export interface Book {
  id: number;
  title: string
}

export class PagedListModel {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  listItems: any[];

}

export interface Log {
  id: number;
  message: string;
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

export interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export class ApplicationUser {
  id: number;
  firstName: string;
  lastName: string;
  companyId: number;
  companyName: string;
  email: string;
  password: string;
  phoneNumber: string;
  emailConfirmed: boolean;
  isActive: boolean;
  roleId: number;
  roleName: string;
  userToken: string;
  applicationRoles: ApplicationRole[];
}

export class ApplicationRole {
  roleId: string;
  roleName: string;
}

//export class UserRole {
//  name: string;
//}

