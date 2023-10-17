using Microsoft.AspNetCore.Mvc;
using User;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProfileController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("ByUser/{userId}")]
    public ActionResult<List<Profile>> GetUsersProfile(int userId)
    {
        var profile = _context.Profiles
                .Include(p => p.User)
                .Include(p => p.Household)
                .Include(p => p.Household.Owner)
                .Where(p => p.UserId == userId).ToList(); 

        if (profile == null)
        {
            return NotFound();
        }

        return Ok(profile);
    }

    [HttpGet("{profileId}")]
    public ActionResult<Profile> GetProfile(int profileId)
    {
        var profile = _context.Profiles
                .Include(p => p.User)
                .Include(p => p.Household)
                .Include(p => p.Household.Owner)
                .FirstOrDefault(p => p.Id == profileId); 

        if (profile == null)
        {
            return NotFound();
        }

        return Ok(profile);
    }
    

    [HttpPost("linkToHousehold")]
    public async Task<IActionResult> LinkToHousehold(int userId, int houseId, int householdCode, string displayName, int avatar, bool isAdmin)
    {
        var user = _context.UserAccounts.FirstOrDefault(u => u.Id == userId);
        var house = _context.Households.FirstOrDefault(h => h.Id == houseId);

        if (user == null)
        {
            return BadRequest("Användaren finns inte.");
        }

        var profile = _context.Profiles
                .Include(p => p.User)
                .Include(p => p.Household)
                .Include(p => p.Household.Owner)
                .FirstOrDefault(p => p.UserId == user.Id); 
        
        var household = _context.Households.FirstOrDefault(h => h.Code == householdCode);
        if (profile == null)
        {
            profile = new Profile
            {
                Avatar = avatar,
                DisplayName = displayName,
                isActive = true,
                isAdmin = isAdmin,
                isDeleted = false,
                User = user,
                Household = house
            };

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
        }

        if (household != null)
        {
            profile.Household = household;
            await _context.SaveChangesAsync();
            return Ok(profile);
            // return CreatedAtAction("Get", new { id = profile.Id }, profile);

        }

        return BadRequest("Hushållet finns inte.");
    }
}