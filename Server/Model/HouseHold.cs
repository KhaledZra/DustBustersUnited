using System.ComponentModel.DataAnnotations.Schema;

namespace User;

public class Household
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Code { get; set; }
    public int OwnerId { get; set; }
    public UserAccount? Owner { get; set; }

    [NotMapped]
    public List<int> AvailableAvatars { get; set; } = new List<int>();


    public int Confirmation()
    {
        Random random = new Random();
        Code = random.Next(1000, 9999);
        return Code;
    }
}