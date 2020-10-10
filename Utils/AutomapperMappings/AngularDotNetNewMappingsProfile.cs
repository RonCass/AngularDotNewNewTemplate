using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Models.DTOIn;
using AngularDotNetNewTemplate.Models.DTOOut;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils.AutomapperMappings
{
    public class AngularDotNetNewMappingsProfile : Profile
    {
        public AngularDotNetNewMappingsProfile()
        {

            CreateMap<ApplicationUser, ApplicationUserIn>().ReverseMap();
            CreateMap<ApplicationUser, ApplicationUserOut>();
            CreateMap<ApplicationUserIn, ApplicationUser>();

            CreateMap<ApplicationRole, ApplicationRoleOut>().ReverseMap();
            CreateMap<ApplicationUserRole, ApplicationUserRoleOut>().ReverseMap();

            CreateMap<ApplicationUser, UserAndRoleOut>();

            CreateMap<APICrudExample, APICrudExampleIn>().ReverseMap();
            CreateMap<APICrudExample, APICrudExampleOut>();




        }
    }
}
