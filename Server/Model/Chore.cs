namespace Model;

public class Chore
{
    // Primary Key
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Energy { get; set; }
    public bool IsActive { get; set; }
    public DateTime Deadline { get; set; }
    public int RepeatInterval { get; set; }

    public string ChoreImageBytesString { get; set; } = string.Empty;
    public string ChoreAudioBytesString { get; set; } = string.Empty;

    // Foreign Key
    public int HouseholdId { get; set; }

}