using LoanPledgingTool.Dtos;
using LoanPledgingTool.Models;
using AutoMapper;

namespace LoanPledgingTool.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LptUser, UserDto>();
            CreateMap<UserDto, LptUser>();
        }
    }
}