# AngularDotNetNewTemplate
Dotnet New Angular Template with added foundational stuff

## Directions to run solution
* I run both VS Code and Visual Studio. I do all client app (frontend) work in VS Code and all C#/API stuff in Visual Studio.
* To setup the database you will have to configure the DefaultConnection in the appsettings.Development.json file. Then uncomment the line in the 
ApplicationDbContext.cs file, line 9. Then when you start debugging, it will automatically create the database and tables for you.
* 1st Open a command window to the ClientApp folder or open a terminal window in VS Code and do an "npm install". Then type npm start to start the 
client app on port 4200. (This has to be done first or you will get an error when debugging the main solution as it expects this site to be 
running already. You can change this in the startup.cs - near the bottom, look for
the comments.)
* 2nd In Visual Studio, Start debugging or hit F5 to start the debugger.
With this setup, you can run the client app in VS Code with the "npm install" running it on port 4200 and also have the main solution running in debug mode within 
Visual Studio. This allows you to make changes to the frontend which will then get rebuilt automatically and refresh in the browser. And you can also stop debugging
in Visual Studio and make changes as needed without having to start and stop both at the same time. I find this easier but you can decide what you like better.

## Source Template - [aspnet/templating](https://github.com/aspnet/templating)
I updated my latest dotnet new templates, version 2.1.**, created a new project with that template and then added
in all the additional stuff I think should be in there for when I need to start a new project.

## Credit
All credit for the original template goes to Steve Sanderson and the asp.net team. I just created
this so that I have a better starting point in the future.

## Updates
I decided to start saving code to this project. Just general stuff that I want to remember etc.

## Stuff I Added
* Angular 8.0.2 on 6/23/2019
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
