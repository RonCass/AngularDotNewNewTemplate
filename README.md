# AngularDotNetNewTemplate
Dotnet New Angular Template with added foundational stuff

## Updates
I decided to start saving code to this project. Just general stuff that I want to remember etc.

## Stuff I Added
* Angular 9.0.5 on 3/6/2020
* Bootstrap 4.* - Upgraded template Bootstrap 4.* and changed the main top nav to use it.
* JQuery 3.3.1 - For Bootstrap 4
* Popper.js 1.14.1 - For Bootstrap 4
* Font Awesome - Added links in the index.html to pull the Font Awesome from their CDN. You can remove or change to your liking
* Lodash 4.17.5 - Lots of little collection and array functions
* Moment 2.21.0 - Date processing
* Toastr 2.1.4 - For popup toast notifications
* Angular Proxy - Changed Startup to use Angular Proxy. So you need to do an "ng serve" in the clientApp folder to run Angular separate from the .Net code running.
* SharedModule that can be imported in to other modules
* CoreModule that has the data.service, auth-guard.service - Work In Progress  configuring the data service.
* ToastrService - For creating toasts messages
* CurrentUserService - Used with Authentication 
* Serilog - Logging to MSSQLServer - Logs Table
* Automapper - Example in startup.cs. Mapping User to UserOut DTO
* Identity with JWT Token Auth
* Database is created and seeded upon Debug
* 
## Disclaimer
I built this for my use. If you find it helpful, all the better. :)
