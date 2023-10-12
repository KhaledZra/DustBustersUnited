using Microsoft.EntityFrameworkCore;
using User;

public class ApplicationDbContext : DbContext
{
    public DbSet<UserAccount> UserAccounts { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
}
