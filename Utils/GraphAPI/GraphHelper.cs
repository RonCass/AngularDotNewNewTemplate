using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils.GraphAPI
{
    public class GraphHelper
    {
        //New PP Registration in our Azure AD
        private string ClientId;
        private string ClientSecret;
        private string TenantId;
        private string RedirectUri;
        private string graphScopes;

        public GraphHelper(IConfiguration configuration)
        {
            //New Online Colo Registration in our Azure AD
            ClientId = configuration.GetSection("AzureADForGraphHelperUtil:ClientId").Value;
            ClientSecret = configuration.GetSection("AzureADForGraphHelperUtil:ClientSecret").Value;
            TenantId = configuration.GetSection("AzureADForGraphHelperUtil:TenantId").Value;
            RedirectUri = configuration.GetSection("AzureADForGraphHelperUtil:RedirectUri").Value;             
        }      

        private GraphServiceClient GetAuthenticatedClient()
        {                 

            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(ClientId)
                .WithTenantId(TenantId)
                .WithClientSecret(ClientSecret)
                .Build();

            ClientCredentialProvider authProvider = new ClientCredentialProvider(confidentialClientApplication);

            // Create a new instance of GraphServiceClient with the authentication provider.
            GraphServiceClient graphClient = new GraphServiceClient(authProvider);

            return graphClient;
        }
                
        public async Task<IEnumerable<User>> GetUsers()
        {
            try
            {
                var graphClient = GetAuthenticatedClient();                

                var users = await graphClient.Users.Request().GetAsync();
                
                return users;

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<IEnumerable<User>> GetUser(string Email)
        {
            var graphClient = GetAuthenticatedClient();

            try
            {
                var users = await graphClient.Users
                      .Request()
                      .Filter("startsWith(mail, '" + Email + "')")
                      .GetAsync();

                return users.CurrentPage;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<bool> DeleteUser(User user)
        {
            try
            {
                var graphClient = GetAuthenticatedClient();

                await graphClient.Users[user.Id]
                    .Request()
                    .DeleteAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        //6-13-2019 Ron C.: Used to invite a user to the Partner Portal. You can decide if they get an email invitation or not.
        public async Task<Invitation> InviteUser(string DisplayName, string EmailAddress, bool SendInvitationMessage = false, string InvitedUserType = "Guest")
        {
            try
            {
                var invitation = new Invitation
                {
                    InvitedUserDisplayName = DisplayName,
                    InvitedUserEmailAddress = EmailAddress,
                    InviteRedirectUrl = "https://PartnerPortal.verticalbridge.com",
                    InvitedUserType = InvitedUserType,
                    SendInvitationMessage = SendInvitationMessage

                };

                var graphClient = GetAuthenticatedClient();
                var result = await graphClient.Invitations
                    .Request()
                    .AddAsync(invitation);

                return result;

            }
            catch (Exception ex)
            {
                throw;
            }
        }


        //If you are adding a user for the Portal, use the InviteUser method. This only adds an AD user that cannot login to the portal - Ron C. 6-13-2019
        public async Task<Boolean> CreateUser(string displayName, string alias, string domain, string password)
        {
            try
            {
                var graphClient = GetAuthenticatedClient();
                var userToAdd = BuildUserToAdd(displayName, alias, domain, password);
                await graphClient.Users.Request().AddAsync(userToAdd);

                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private static User BuildUserToAdd(string displayName, string alias, string domain, string password)
        {
            var passwordProfile = new PasswordProfile
            {
                Password = password,
                ForceChangePasswordNextSignIn = true
            };
            var user = new User
            {
                AccountEnabled = true,
                DisplayName = displayName,
                MailNickname = "MailNickName-Value",
                //Mail = "RonTest3@RonTest.com",
                UserPrincipalName = $@"{alias.Replace("@", "_")}@{domain}",
                //UserPrincipalName = "RonTest_RonTest.Com@verticalbridgepartner.onmicrosoft.com",
                PasswordProfile = passwordProfile,
                UserType = "Guest"

            };
            return user;
        }


        //public async Task<User> FindByAlias(string alias)
        //{
        //    List<QueryOption> queryOptions = new List<QueryOption>
        //{
        //    new QueryOption("$filter", $@"mailNickname eq '{alias}'")
        //};

        //    var userResult = await _graphClient.Users.Request(queryOptions).GetAsync();
        //    if (userResult.Count != 1) throw new ApplicationException($"Unable to find a user with the alias {alias}");
        //    return userResult[0];
        //}

        //public async Task<User> GetUser(string username)
        //{
        //    var graphClient = GetAuthenticatedClient();

        //    var users = await graphClient.Users.Request().GetAsync();

        //    return users.CurrentPage;
        //}



    }
}
