# AngularDotNetNewTemplate
Dotnet New Angular Template with added foundational stuff

## Source Template - [aspnet/templating](https://github.com/aspnet/templating)
I updated my latest dotnet new templates, version 2.1.**, created a new project with that template and then added
in all the additional stuff I think should be in there for when I need to start a new project.

## Credit
All credit for the original template goes to Steve Sanderson and the asp.net team. I just created
this so that I have a better starting point in the future.

## Update
I decided to also start saving code to this project. Just general stuff that I want to remember etc.

## Stuff I Added
* Item Angular 6: 5/2018: Upgraded to Angular 6 with new CLI
* Item Bootstrap 4.* - Upgraded template Bootstrap 4.* and changed the main top nav to use it.
* Item JQuery 3.3.1 - For Bootstrap 4
* Item Popper.js 1.14.1 - For Bootstrap 4
* Item Font Awesome - Added links in the index.html to pull the Font Awesome from their CDN. You can remove or change to your liking
* Item  Lodash 4.17.5 - Lots of little collection and array functions
* Item Moment 2.21.0 - Date processing
* Item Toastr 2.1.4 - For popup toast notifications
* Item Angular Proxy - Changed Startup to use Angular Proxy. So you need to do an "ng serve" in the clientApp folder to run Angular separate from the .Net code running.
* Item SharedModule that can be imported in to other modules
* Item CoreModule that has the data.service, auth-guard.service - Work In Progress  configuring the data service.
* Item ToastrService - For creating toasts messages
* Item CurrentUserService - Used with Authentication 
* Item Serilog - Logging to MSSQLServer - Logs Table
* Item Automapper - Example in startup.cs. Mapping User to UserOut DTO
* Item Identity with JWT Token Auth
* Item Database is created and seeded upon Debug
* 
## Disclaimer
I built this for my use. If you find it helpful, all the better. :)
