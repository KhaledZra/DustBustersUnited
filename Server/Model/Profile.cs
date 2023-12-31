namespace Model;

public class Profile
{
    public int Id { get; set; }
    public int Avatar { get; set; }
    public string DisplayName { get; set; } = "";
    public bool isAdmin { get; set; }
    public bool isActive { get; set; }
    public bool isDeleted { get; set; }
    public bool isRequest { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public int HouseholdId { get; set; }
    public Household? Household { get; set; }
}