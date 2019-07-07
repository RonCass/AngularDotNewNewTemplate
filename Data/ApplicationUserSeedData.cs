using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AngularDotNetNewTemplate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Data
{
    public class ApplicationUserSeedData
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private ApplicationRoleManager _roleManager;

        public ApplicationUserSeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ApplicationRoleManager roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public static async Task EnsureSeedDataAsync(ApplicationDbContext _context, ApplicationRoleManager _roleManager, UserManager<ApplicationUser> _userManager, IServiceProvider serviceProvider)
        {


            _context.Database.EnsureCreated();

            //Add Default Roles
            EnsureRoleCreated("SuperAdmin", _context, _roleManager);
            EnsureRoleCreated("Admin", _context, _roleManager);
            EnsureRoleCreated("User", _context, _roleManager);


            try
            {
                if (await _userManager.FindByEmailAsync("SuperAdmin@MyWebsite.com") == null)
                {
                    //var adminID = await EnsureUser(serviceProvider, _userManager, "asdasd1!!", "admin@contoso.com");


                    //Add New User
                    var newUser = new ApplicationUser()
                    {
                        UserName = "SuperAdmin@MyWebsite.com",
                        Email = "SuperAdmin@MyWebsite.com",
                        FirstName = "John",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D"),
                        IsActive = true
                    };


                    await _userManager.CreateAsync(newUser, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser, "SuperAdmin");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));
                }

                if (await _userManager.FindByEmailAsync("Admin@MyWebsite.com") == null)
                {
                    //Add Admin New User
                    var newUser2 = new ApplicationUser()
                    {
                        UserName = "Admin@MyWebsite.com",
                        Email = "Admin@MyWebsite.com",
                        FirstName = "Admin",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D"),
                        IsActive = true
                    };

                    await _userManager.CreateAsync(newUser2, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser2, "Admin");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
                }

                if (await _userManager.FindByEmailAsync("User@MyWebsite.com") == null)
                {
                    //Add New User
                    var newUser3 = new ApplicationUser()
                    {
                        UserName = "User@MyWebsite.com",
                        Email = "User@MyWebsite.com",
                        FirstName = "User",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D"),
                        IsActive = true
                    };

                    await _userManager.CreateAsync(newUser3, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser3, "User");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            AddDefaultData(_context);
        }

        public static void AddDefaultData(ApplicationDbContext _context)
        {

            if (!_context.DummyData.Any())
            {
                for (int i = 1; i < 51; i++)
                {
                    var myRow = new DummyData() { Col1 = "Col1 Row" + i, Col2 = "Col2Row" + i, Col3 = "Col3Row" + i };
                    _context.DummyData.Add(myRow);
                }

                _context.SaveChanges();
            }

            if (!_context.State.Any())
            {
                try
                {
                    //Load States in to the DB
                    _context.State.Add(new State() { Abbreviation = "AL", Name = "Alabama" });
                    _context.State.Add(new State() { Abbreviation = "AK", Name = "Alaska" });
                    _context.State.Add(new State() { Abbreviation = "AZ", Name = "Arizona" });
                    _context.State.Add(new State() { Abbreviation = "AR", Name = "Arkansas" });
                    _context.State.Add(new State() { Abbreviation = "CA", Name = "California" });
                    _context.State.Add(new State() { Abbreviation = "CO", Name = "Colorado" });
                    _context.State.Add(new State() { Abbreviation = "CT", Name = "Connecticut" });
                    _context.State.Add(new State() { Abbreviation = "DC", Name = "D.C." });
                    _context.State.Add(new State() { Abbreviation = "DE", Name = "Delaware" });
                    _context.State.Add(new State() { Abbreviation = "FL", Name = "Florida" });
                    _context.State.Add(new State() { Abbreviation = "GA", Name = "Georgia" });
                    _context.State.Add(new State() { Abbreviation = "HI", Name = "Hawaii" });
                    _context.State.Add(new State() { Abbreviation = "ID", Name = "Idaho" });
                    _context.State.Add(new State() { Abbreviation = "IL", Name = "Illinois" });
                    _context.State.Add(new State() { Abbreviation = "IN", Name = "Indiana" });
                    _context.State.Add(new State() { Abbreviation = "IA", Name = "Iowa" });
                    _context.State.Add(new State() { Abbreviation = "KS", Name = "Kansas" });
                    _context.State.Add(new State() { Abbreviation = "KY", Name = "Kentucky" });
                    _context.State.Add(new State() { Abbreviation = "LA", Name = "Louisiana" });
                    _context.State.Add(new State() { Abbreviation = "ME", Name = "Maine" });
                    _context.State.Add(new State() { Abbreviation = "MD", Name = "Maryland" });
                    _context.State.Add(new State() { Abbreviation = "MA", Name = "Massachusetts" });
                    _context.State.Add(new State() { Abbreviation = "MI", Name = "Michigan" });
                    _context.State.Add(new State() { Abbreviation = "MN", Name = "Minnesota" });
                    _context.State.Add(new State() { Abbreviation = "MS", Name = "Mississippi" });
                    _context.State.Add(new State() { Abbreviation = "MO", Name = "Missouri" });
                    _context.State.Add(new State() { Abbreviation = "MT", Name = "Montana" });
                    _context.State.Add(new State() { Abbreviation = "NE", Name = "Nebraska" });
                    _context.State.Add(new State() { Abbreviation = "NV", Name = "Nevada" });
                    _context.State.Add(new State() { Abbreviation = "NH", Name = "New Hampshire" });
                    _context.State.Add(new State() { Abbreviation = "NJ", Name = "New Jersey" });
                    _context.State.Add(new State() { Abbreviation = "NM", Name = "New Mexico" });
                    _context.State.Add(new State() { Abbreviation = "NY", Name = "New York" });
                    _context.State.Add(new State() { Abbreviation = "NC", Name = "North Carolina" });
                    _context.State.Add(new State() { Abbreviation = "ND", Name = "North Dakota" });
                    _context.State.Add(new State() { Abbreviation = "OH", Name = "Ohio" });
                    _context.State.Add(new State() { Abbreviation = "OK", Name = "Oklahoma" });
                    _context.State.Add(new State() { Abbreviation = "OR", Name = "Oregon" });
                    _context.State.Add(new State() { Abbreviation = "PA", Name = "Pennsylvania" });
                    _context.State.Add(new State() { Abbreviation = "RI", Name = "Rhode Island" });
                    _context.State.Add(new State() { Abbreviation = "SC", Name = "South Carolina" });
                    _context.State.Add(new State() { Abbreviation = "SD", Name = "South Dakota" });
                    _context.State.Add(new State() { Abbreviation = "TN", Name = "Tennessee" });
                    _context.State.Add(new State() { Abbreviation = "TX", Name = "Texas" });
                    _context.State.Add(new State() { Abbreviation = "UT", Name = "Utah" });
                    _context.State.Add(new State() { Abbreviation = "VT", Name = "Vermont" });
                    _context.State.Add(new State() { Abbreviation = "VA", Name = "Virginia" });
                    _context.State.Add(new State() { Abbreviation = "WA", Name = "Washington" });
                    _context.State.Add(new State() { Abbreviation = "WV", Name = "West Virginia" });
                    _context.State.Add(new State() { Abbreviation = "WI", Name = "Wisconsin" });
                    _context.State.Add(new State() { Abbreviation = "WY", Name = "Wyoming" });
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {

                    throw;
                }

            }

            if (!_context.Country.Any())
            {

                _context.Country.Add(new Country() { Name = "United States", Abbreviation = "US" });
                _context.Country.Add(new Country() { Name = "Canada", Abbreviation = "CA" });
                _context.Country.Add(new Country() { Name = "Afghanistan", Abbreviation = "AF" });
                _context.Country.Add(new Country() { Name = "Albania", Abbreviation = "AL" });
                _context.Country.Add(new Country() { Name = "Algeria", Abbreviation = "DZ" });
                _context.Country.Add(new Country() { Name = "American Samoa", Abbreviation = "AS" });
                _context.Country.Add(new Country() { Name = "Andorra", Abbreviation = "AD" });
                _context.Country.Add(new Country() { Name = "Angola", Abbreviation = "AO" });
                _context.Country.Add(new Country() { Name = "Anguilla", Abbreviation = "AI" });
                _context.Country.Add(new Country() { Name = "Antarctica", Abbreviation = "AQ" });
                _context.Country.Add(new Country() { Name = "Antigua and Barbuda", Abbreviation = "AG" });
                _context.Country.Add(new Country() { Name = "Argentina", Abbreviation = "AR" });
                _context.Country.Add(new Country() { Name = "Armenia", Abbreviation = "AM" });
                _context.Country.Add(new Country() { Name = "Aruba", Abbreviation = "AW" });
                _context.Country.Add(new Country() { Name = "Australia", Abbreviation = "AU" });
                _context.Country.Add(new Country() { Name = "Austria", Abbreviation = "AT" });
                _context.Country.Add(new Country() { Name = "Azerbaijan", Abbreviation = "AZ" });
                _context.Country.Add(new Country() { Name = "Bahamas", Abbreviation = "BS" });
                _context.Country.Add(new Country() { Name = "Bahrain", Abbreviation = "BH" });
                _context.Country.Add(new Country() { Name = "Bangladesh", Abbreviation = "BD" });
                _context.Country.Add(new Country() { Name = "Barbados", Abbreviation = "BB" });
                _context.Country.Add(new Country() { Name = "Belarus", Abbreviation = "BY" });
                _context.Country.Add(new Country() { Name = "Belgium", Abbreviation = "BE" });
                _context.Country.Add(new Country() { Name = "Belize", Abbreviation = "BZ" });
                _context.Country.Add(new Country() { Name = "Benin", Abbreviation = "BJ" });
                _context.Country.Add(new Country() { Name = "Bermuda", Abbreviation = "BM" });
                _context.Country.Add(new Country() { Name = "Bhutan", Abbreviation = "BT" });
                _context.Country.Add(new Country() { Name = "Bolivia", Abbreviation = "BO" });
                _context.Country.Add(new Country() { Name = "Bosnia and Herzegovina", Abbreviation = "BA" });
                _context.Country.Add(new Country() { Name = "Botswana", Abbreviation = "BW" });
                _context.Country.Add(new Country() { Name = "Bouvet Island", Abbreviation = "BV" });
                _context.Country.Add(new Country() { Name = "Brazil", Abbreviation = "BR" });
                _context.Country.Add(new Country() { Name = "British Indian Ocean Territory", Abbreviation = "IO" });
                _context.Country.Add(new Country() { Name = "Brunei Darussalam", Abbreviation = "BN" });
                _context.Country.Add(new Country() { Name = "Bulgaria", Abbreviation = "BG" });
                _context.Country.Add(new Country() { Name = "Burkina Faso", Abbreviation = "BF" });
                _context.Country.Add(new Country() { Name = "Burundi", Abbreviation = "BI" });
                _context.Country.Add(new Country() { Name = "Cambodia", Abbreviation = "KH" });
                _context.Country.Add(new Country() { Name = "Cameroon", Abbreviation = "CM" });
                _context.Country.Add(new Country() { Name = "Canada", Abbreviation = "CA" });
                _context.Country.Add(new Country() { Name = "Cape Verde", Abbreviation = "CV" });
                _context.Country.Add(new Country() { Name = "Cayman Islands", Abbreviation = "KY" });
                _context.Country.Add(new Country() { Name = "Central African Republic", Abbreviation = "CF" });
                _context.Country.Add(new Country() { Name = "Chad", Abbreviation = "TD" });
                _context.Country.Add(new Country() { Name = "Chile", Abbreviation = "CL" });
                _context.Country.Add(new Country() { Name = "China", Abbreviation = "CN" });
                _context.Country.Add(new Country() { Name = "Christmas Island", Abbreviation = "CX" });
                _context.Country.Add(new Country() { Name = "Cocos (Keeling) Islands", Abbreviation = "CC" });
                _context.Country.Add(new Country() { Name = "Colombia", Abbreviation = "CO" });
                _context.Country.Add(new Country() { Name = "Comoros", Abbreviation = "KM" });
                _context.Country.Add(new Country() { Name = "Congo", Abbreviation = "CG" });
                _context.Country.Add(new Country() { Name = "Cook Islands", Abbreviation = "CK" });
                _context.Country.Add(new Country() { Name = "Costa Rica", Abbreviation = "CR" });
                _context.Country.Add(new Country() { Name = "Cote D Ivoire (Ivory Coast)", Abbreviation = "CI" });
                _context.Country.Add(new Country() { Name = "Croatia (Hrvatska)", Abbreviation = "HR" });
                _context.Country.Add(new Country() { Name = "Cuba", Abbreviation = "CU" });
                _context.Country.Add(new Country() { Name = "Cyprus", Abbreviation = "CY" });
                _context.Country.Add(new Country() { Name = "Czech Republic", Abbreviation = "CZ" });
                _context.Country.Add(new Country() { Name = "Denmark", Abbreviation = "DK" });
                _context.Country.Add(new Country() { Name = "Djibouti", Abbreviation = "DJ" });
                _context.Country.Add(new Country() { Name = "Dominica", Abbreviation = "DM" });
                _context.Country.Add(new Country() { Name = "Dominican Republic", Abbreviation = "DO" });
                _context.Country.Add(new Country() { Name = "East Timor", Abbreviation = "TP" });
                _context.Country.Add(new Country() { Name = "Ecuador", Abbreviation = "EC" });
                _context.Country.Add(new Country() { Name = "Egypt", Abbreviation = "EG" });
                _context.Country.Add(new Country() { Name = "El Salvador", Abbreviation = "SV" });
                _context.Country.Add(new Country() { Name = "Equatorial Guinea", Abbreviation = "GQ" });
                _context.Country.Add(new Country() { Name = "Eritrea", Abbreviation = "ER" });
                _context.Country.Add(new Country() { Name = "Estonia", Abbreviation = "EE" });
                _context.Country.Add(new Country() { Name = "Ethiopia", Abbreviation = "ET" });
                _context.Country.Add(new Country() { Name = "Falkland Islands (Malvinas)", Abbreviation = "FK" });
                _context.Country.Add(new Country() { Name = "Faroe Islands", Abbreviation = "FO" });
                _context.Country.Add(new Country() { Name = "Fiji", Abbreviation = "FJ" });
                _context.Country.Add(new Country() { Name = "Finland", Abbreviation = "FI" });
                _context.Country.Add(new Country() { Name = "France", Abbreviation = "FR" });
                _context.Country.Add(new Country() { Name = "French Guiana", Abbreviation = "GF" });
                _context.Country.Add(new Country() { Name = "French Polynesia", Abbreviation = "PF" });
                _context.Country.Add(new Country() { Name = "French Southern Territories", Abbreviation = "TF" });
                _context.Country.Add(new Country() { Name = "Gabon", Abbreviation = "GA" });
                _context.Country.Add(new Country() { Name = "Gambia", Abbreviation = "GM" });
                _context.Country.Add(new Country() { Name = "Gaza", Abbreviation = "GZ" });
                _context.Country.Add(new Country() { Name = "Georgia", Abbreviation = "GE" });
                _context.Country.Add(new Country() { Name = "Germany", Abbreviation = "DE" });
                _context.Country.Add(new Country() { Name = "Ghana", Abbreviation = "GH" });
                _context.Country.Add(new Country() { Name = "Gibraltar", Abbreviation = "GI" });
                _context.Country.Add(new Country() { Name = "Greece", Abbreviation = "GR" });
                _context.Country.Add(new Country() { Name = "Greenland", Abbreviation = "GL" });
                _context.Country.Add(new Country() { Name = "Grenada", Abbreviation = "GD" });
                _context.Country.Add(new Country() { Name = "Guadeloupe", Abbreviation = "GP" });
                _context.Country.Add(new Country() { Name = "Guam", Abbreviation = "GU" });
                _context.Country.Add(new Country() { Name = "Guatemala", Abbreviation = "GT" });
                _context.Country.Add(new Country() { Name = "Guinea", Abbreviation = "GN" });
                _context.Country.Add(new Country() { Name = "Guinea-Bissau", Abbreviation = "GW" });
                _context.Country.Add(new Country() { Name = "Guyana", Abbreviation = "GY" });
                _context.Country.Add(new Country() { Name = "Haiti", Abbreviation = "HT" });
                _context.Country.Add(new Country() { Name = "Heard and McDonald Islands", Abbreviation = "HM" });
                _context.Country.Add(new Country() { Name = "Honduras", Abbreviation = "HN" });
                _context.Country.Add(new Country() { Name = "Hong Kong", Abbreviation = "HK" });
                _context.Country.Add(new Country() { Name = "Hungary", Abbreviation = "HU" });
                _context.Country.Add(new Country() { Name = "Iceland", Abbreviation = "IS" });
                _context.Country.Add(new Country() { Name = "India", Abbreviation = "IN" });
                _context.Country.Add(new Country() { Name = "Indonesia", Abbreviation = "ID" });
                _context.Country.Add(new Country() { Name = "Iran", Abbreviation = "IR" });
                _context.Country.Add(new Country() { Name = "Iraq", Abbreviation = "IQ" });
                _context.Country.Add(new Country() { Name = "Ireland", Abbreviation = "IE" });
                _context.Country.Add(new Country() { Name = "Israel", Abbreviation = "IL" });
                _context.Country.Add(new Country() { Name = "Italy", Abbreviation = "IT" });
                _context.Country.Add(new Country() { Name = "Jamaica", Abbreviation = "JM" });
                _context.Country.Add(new Country() { Name = "Japan", Abbreviation = "JP" });
                _context.Country.Add(new Country() { Name = "Jordan", Abbreviation = "JO" });
                _context.Country.Add(new Country() { Name = "Kazakhstan", Abbreviation = "KZ" });
                _context.Country.Add(new Country() { Name = "Kenya", Abbreviation = "KE" });
                _context.Country.Add(new Country() { Name = "Kiribati", Abbreviation = "KI" });
                _context.Country.Add(new Country() { Name = "Korea (North)", Abbreviation = "KP" });
                _context.Country.Add(new Country() { Name = "Korea (South)", Abbreviation = "KR" });
                _context.Country.Add(new Country() { Name = "Kuwait", Abbreviation = "KW" });
                _context.Country.Add(new Country() { Name = "Kyrgyzstan", Abbreviation = "KG" });
                _context.Country.Add(new Country() { Name = "Laos", Abbreviation = "LA" });
                _context.Country.Add(new Country() { Name = "Latvia", Abbreviation = "LV" });
                _context.Country.Add(new Country() { Name = "Lebanon", Abbreviation = "LB" });
                _context.Country.Add(new Country() { Name = "Lesotho", Abbreviation = "LS" });
                _context.Country.Add(new Country() { Name = "Liberia", Abbreviation = "LR" });
                _context.Country.Add(new Country() { Name = "Libya", Abbreviation = "LY" });
                _context.Country.Add(new Country() { Name = "Liechtenstein", Abbreviation = "LI" });
                _context.Country.Add(new Country() { Name = "Lithuania", Abbreviation = "LT" });
                _context.Country.Add(new Country() { Name = "Luxembourg", Abbreviation = "LU" });
                _context.Country.Add(new Country() { Name = "Macau", Abbreviation = "MO" });
                _context.Country.Add(new Country() { Name = "Macedonia", Abbreviation = "MK" });
                _context.Country.Add(new Country() { Name = "Madagascar", Abbreviation = "MG" });
                _context.Country.Add(new Country() { Name = "Malawi", Abbreviation = "MW" });
                _context.Country.Add(new Country() { Name = "Malaysia", Abbreviation = "MY" });
                _context.Country.Add(new Country() { Name = "Maldives", Abbreviation = "MV" });
                _context.Country.Add(new Country() { Name = "Mali", Abbreviation = "ML" });
                _context.Country.Add(new Country() { Name = "Malta", Abbreviation = "MT" });
                _context.Country.Add(new Country() { Name = "Marshall Islands", Abbreviation = "MH" });
                _context.Country.Add(new Country() { Name = "Martinique", Abbreviation = "MQ" });
                _context.Country.Add(new Country() { Name = "Mauritania", Abbreviation = "MR" });
                _context.Country.Add(new Country() { Name = "Mauritius", Abbreviation = "MU" });
                _context.Country.Add(new Country() { Name = "Mayotte", Abbreviation = "YT" });
                _context.Country.Add(new Country() { Name = "Mexico", Abbreviation = "MX" });
                _context.Country.Add(new Country() { Name = "Micronesia", Abbreviation = "FM" });
                _context.Country.Add(new Country() { Name = "Moldova", Abbreviation = "MD" });
                _context.Country.Add(new Country() { Name = "Monaco", Abbreviation = "MC" });
                _context.Country.Add(new Country() { Name = "Mongolia", Abbreviation = "MN" });
                _context.Country.Add(new Country() { Name = "Montserrat", Abbreviation = "MS" });
                _context.Country.Add(new Country() { Name = "Morocco", Abbreviation = "MA" });
                _context.Country.Add(new Country() { Name = "Mozambique", Abbreviation = "MZ" });
                _context.Country.Add(new Country() { Name = "Myanmar", Abbreviation = "MM" });
                _context.Country.Add(new Country() { Name = "Namibia", Abbreviation = "NA" });
                _context.Country.Add(new Country() { Name = "Nauru", Abbreviation = "NR" });
                _context.Country.Add(new Country() { Name = "Nepal", Abbreviation = "NP" });
                _context.Country.Add(new Country() { Name = "Netherlands", Abbreviation = "NL" });
                _context.Country.Add(new Country() { Name = "Netherlands Antilles", Abbreviation = "AN" });
                _context.Country.Add(new Country() { Name = "New Caledonia", Abbreviation = "NC" });
                _context.Country.Add(new Country() { Name = "New Zealand", Abbreviation = "NZ" });
                _context.Country.Add(new Country() { Name = "Nicaragua", Abbreviation = "NI" });
                _context.Country.Add(new Country() { Name = "Niger", Abbreviation = "NE" });
                _context.Country.Add(new Country() { Name = "Nigeria", Abbreviation = "NG" });
                _context.Country.Add(new Country() { Name = "Niue", Abbreviation = "NU" });
                _context.Country.Add(new Country() { Name = "Norfolk Island", Abbreviation = "NF" });
                _context.Country.Add(new Country() { Name = "Northern Mariana Islands", Abbreviation = "MP" });
                _context.Country.Add(new Country() { Name = "Norway", Abbreviation = "NO" });
                _context.Country.Add(new Country() { Name = "Oman", Abbreviation = "OM" });
                _context.Country.Add(new Country() { Name = "Pakistan", Abbreviation = "PK" });
                _context.Country.Add(new Country() { Name = "Palau", Abbreviation = "PW" });
                _context.Country.Add(new Country() { Name = "Panama", Abbreviation = "PA" });
                _context.Country.Add(new Country() { Name = "Papua New Guinea", Abbreviation = "PG" });
                _context.Country.Add(new Country() { Name = "Paraguay", Abbreviation = "PY" });
                _context.Country.Add(new Country() { Name = "Peru", Abbreviation = "PE" });
                _context.Country.Add(new Country() { Name = "Philippines", Abbreviation = "PH" });
                _context.Country.Add(new Country() { Name = "Pitcairn", Abbreviation = "PN" });
                _context.Country.Add(new Country() { Name = "Poland", Abbreviation = "PL" });
                _context.Country.Add(new Country() { Name = "Portugal", Abbreviation = "PT" });
                _context.Country.Add(new Country() { Name = "Puerto Rico", Abbreviation = "PR" });
                _context.Country.Add(new Country() { Name = "Qatar", Abbreviation = "QA" });
                _context.Country.Add(new Country() { Name = "Reunion", Abbreviation = "RE" });
                _context.Country.Add(new Country() { Name = "Romania", Abbreviation = "RO" });
                _context.Country.Add(new Country() { Name = "Russian Federation", Abbreviation = "RU" });
                _context.Country.Add(new Country() { Name = "Rwanda", Abbreviation = "RW" });
                _context.Country.Add(new Country() { Name = "Saint Kitts and Nevis", Abbreviation = "KN" });
                _context.Country.Add(new Country() { Name = "Saint Lucia", Abbreviation = "LC" });
                _context.Country.Add(new Country() { Name = "Saint Vincent and the Grenadines", Abbreviation = "VC" });
                _context.Country.Add(new Country() { Name = "Samoa", Abbreviation = "WS" });
                _context.Country.Add(new Country() { Name = "San Marino", Abbreviation = "SM" });
                _context.Country.Add(new Country() { Name = "Sao Tome and Principe", Abbreviation = "ST" });
                _context.Country.Add(new Country() { Name = "Saudi Arabia", Abbreviation = "SA" });
                _context.Country.Add(new Country() { Name = "Senegal", Abbreviation = "SN" });
                _context.Country.Add(new Country() { Name = "Seychelles", Abbreviation = "SC" });
                _context.Country.Add(new Country() { Name = "Sierra Leone", Abbreviation = "SL" });
                _context.Country.Add(new Country() { Name = "Singapore", Abbreviation = "SG" });
                _context.Country.Add(new Country() { Name = "Slovak Republic", Abbreviation = "SK" });
                _context.Country.Add(new Country() { Name = "Slovenia", Abbreviation = "SI" });
                _context.Country.Add(new Country() { Name = "Solomon Islands", Abbreviation = "SB" });
                _context.Country.Add(new Country() { Name = "Somalia", Abbreviation = "SO" });
                _context.Country.Add(new Country() { Name = "South Africa", Abbreviation = "ZA" });
                _context.Country.Add(new Country() { Name = "Spain", Abbreviation = "ES" });
                _context.Country.Add(new Country() { Name = "Sri Lanka", Abbreviation = "LK" });
                _context.Country.Add(new Country() { Name = "St. Helena", Abbreviation = "SH" });
                _context.Country.Add(new Country() { Name = "St. Pierre and Miquelon", Abbreviation = "PM" });
                _context.Country.Add(new Country() { Name = "Sudan", Abbreviation = "SD" });
                _context.Country.Add(new Country() { Name = "Suriname", Abbreviation = "SR" });
                _context.Country.Add(new Country() { Name = "Svalbard and Jan Mayen Islands", Abbreviation = "SJ" });
                _context.Country.Add(new Country() { Name = "Swaziland", Abbreviation = "SZ" });
                _context.Country.Add(new Country() { Name = "Sweden", Abbreviation = "SE" });
                _context.Country.Add(new Country() { Name = "Switzerland", Abbreviation = "CH" });
                _context.Country.Add(new Country() { Name = "Syria", Abbreviation = "SY" });
                _context.Country.Add(new Country() { Name = "Taiwan", Abbreviation = "TW" });
                _context.Country.Add(new Country() { Name = "Tajikistan", Abbreviation = "TJ" });
                _context.Country.Add(new Country() { Name = "Tanzania", Abbreviation = "TZ" });
                _context.Country.Add(new Country() { Name = "Thailand", Abbreviation = "TH" });
                _context.Country.Add(new Country() { Name = "Togo", Abbreviation = "TG" });
                _context.Country.Add(new Country() { Name = "Tokelau", Abbreviation = "TK" });
                _context.Country.Add(new Country() { Name = "Tonga", Abbreviation = "TO" });
                _context.Country.Add(new Country() { Name = "Trinidad and Tobago", Abbreviation = "TT" });
                _context.Country.Add(new Country() { Name = "Tunisia", Abbreviation = "TN" });
                _context.Country.Add(new Country() { Name = "Turkey", Abbreviation = "TR" });
                _context.Country.Add(new Country() { Name = "Turkmenistan", Abbreviation = "TM" });
                _context.Country.Add(new Country() { Name = "Turks and Caicos Islands", Abbreviation = "TC" });
                _context.Country.Add(new Country() { Name = "Tuvalu", Abbreviation = "TV" });
                _context.Country.Add(new Country() { Name = "Uganda", Abbreviation = "UG" });
                _context.Country.Add(new Country() { Name = "Ukraine", Abbreviation = "UA" });
                _context.Country.Add(new Country() { Name = "United Arab Emirates", Abbreviation = "AE" });
                _context.Country.Add(new Country() { Name = "United Kingdom", Abbreviation = "GB" });
                _context.Country.Add(new Country() { Name = "United States", Abbreviation = "US" });
                _context.Country.Add(new Country() { Name = "Uruguay", Abbreviation = "UY" });
                _context.Country.Add(new Country() { Name = "US Minor Outlying Islands", Abbreviation = "UM" });
                _context.Country.Add(new Country() { Name = "Uzbekistan", Abbreviation = "UZ" });
                _context.Country.Add(new Country() { Name = "Vanuatu", Abbreviation = "VU" });
                _context.Country.Add(new Country() { Name = "Vatican City State (Holy See)", Abbreviation = "VA" });
                _context.Country.Add(new Country() { Name = "Venezuela", Abbreviation = "VE" });
                _context.Country.Add(new Country() { Name = "Viet Nam", Abbreviation = "VN" });
                _context.Country.Add(new Country() { Name = "Virgin Islands (British)", Abbreviation = "VG" });
                _context.Country.Add(new Country() { Name = "Virgin Islands (U.S.)", Abbreviation = "VI" });
                _context.Country.Add(new Country() { Name = "Wallis and Futuna Islands", Abbreviation = "WF" });
                _context.Country.Add(new Country() { Name = "West Bank", Abbreviation = "WB" });
                _context.Country.Add(new Country() { Name = "Western Sahara", Abbreviation = "EH" });
                _context.Country.Add(new Country() { Name = "Yemen", Abbreviation = "YE" });
                _context.Country.Add(new Country() { Name = "Yugoslavia", Abbreviation = "YU" });
                _context.Country.Add(new Country() { Name = "Zaire", Abbreviation = "ZR" });
                _context.Country.Add(new Country() { Name = "Zambia", Abbreviation = "ZM" });
                _context.Country.Add(new Country() { Name = "Zimbabwe", Abbreviation = "ZW" });

                _context.SaveChanges();
            }

        }

        private static async Task<int> EnsureUser(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager,
                                              string testUserPw, string UserName)
        {
            //var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            var user = await userManager.FindByNameAsync(UserName);
            if (user == null)
            {
                user = new ApplicationUser { UserName = UserName };
                await userManager.CreateAsync(user, testUserPw);
            }

            return user.Id;
        }

        private static void EnsureRoleCreated(string roleName, ApplicationDbContext _context, ApplicationRoleManager _roleManager)
        {
            try
            {
                if (_context.Roles.FirstOrDefault(x => x.Name == roleName) == null)
                {
                    var myAppRole = new ApplicationRole();
                    myAppRole.Name = roleName;
                    _roleManager.CreateAsync(myAppRole).Wait();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
