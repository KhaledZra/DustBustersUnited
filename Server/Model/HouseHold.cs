using System.ComponentModel.DataAnnotations.Schema;
using DTO;

namespace Model;



public class Household
{
    public Household(){
        
    }
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Code { get; set; }
    public int UserId { get; set; }

    [NotMapped]
    public List<int> AvailableAvatars { get; set; } = new List<int>();
    
    public ICollection<Profile> Profiles { get; }  = new List<Profile>();


    public Household(HouseholdDto dto)
    {    
        Name = dto.Name;
        UserId = dto.OwnerId;
        Random random = new Random();
        Code = random.Next(1000, 9999);        
    }
}