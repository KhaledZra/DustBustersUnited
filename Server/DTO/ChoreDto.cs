namespace DTO;

public class ChoreDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Energy { get; set; }
    public int RepeatInterval { get; set; }

    // Foreign Key
    public int HouseholdId { get; set; }
}