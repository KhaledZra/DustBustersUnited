namespace Model;

public class ProfileChore
{
    public int Id { get; set; }
    public DateTime? DateCompleted { get; set; }
    
    public int ProfileId { get; set; }
    public int ChoreId { get; set; }

}