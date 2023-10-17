using Microsoft.EntityFrameworkCore;
using User;

public class ApplicationDbContext : DbContext
{
    public DbSet<UserAccount> UserAccounts { get; set; }
    public DbSet<Household> Households { get; set; }
    public DbSet<Profile> Profiles { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
}