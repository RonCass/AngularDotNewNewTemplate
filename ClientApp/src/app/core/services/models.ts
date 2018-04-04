
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
    company: string;
    email: string;
    roleId: number;
    roleName: string;
    userToken: string;
}
export class UserRole {
    name: string;
}

