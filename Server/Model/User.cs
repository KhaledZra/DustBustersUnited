using System.ComponentModel.DataAnnotations.Schema;

namespace Model;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    
    public ICollection<Household> Households { get; set; }
}