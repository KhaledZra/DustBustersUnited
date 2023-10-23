namespace DTO;

public class LinkToHouseholdDto
{
    public int UserId { get; set; }
    public int HouseholdId { get; set; }
    public int Code { get; set; }
    public string DisplayName { get; set; } = "";
    public int Avatar { get; set; }
    public bool IsAdmin { get; set; }

}