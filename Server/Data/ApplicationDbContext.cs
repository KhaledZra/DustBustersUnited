using Microsoft.EntityFrameworkCore;
using Model;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Household> Households { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Chore> Chores { get; set; }
    public DbSet<ProfileChore> ProfileChores { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
}