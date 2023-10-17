namespace User;

public class Household
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Code { get; set; }
    public int OwnerId { get; set; }
    public UserAccount? Owner { get; set; }

    public int Confirmation()
    {
        Random random = new Random();
        Code = random.Next(20, 10000);
        return Code;
    }
}