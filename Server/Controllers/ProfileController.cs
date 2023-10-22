using Microsoft.AspNetCore.Mvc;
using Model;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using DTO;

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
        var profiles = _context.Profiles
                .Include(p => p.User)
                .Include(p => p.Household)
                .Where(p => p.UserId == userId).ToList();

        return Ok(profiles);
    }

    [HttpGet("{profileId}")]
    public ActionResult<Profile> GetProfile(int profileId)
    {
        var profile = _context.Profiles
                .Include(p => p.User)
                .Include(p => p.User)
                .FirstOrDefault(p => p.Id == profileId);

        if (profile == null)
        {
            return NotFound();
        }

        return Ok(profile);
    }


    [HttpPost("linkToHousehold")]
    public async Task<IActionResult> LinkToHousehold(LinkToHouseholdDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == dto.UserId);
        var household = _context.Households.FirstOrDefault(h => h.Code == dto.Code);

        if (user == null)
        {
            return BadRequest("Användaren finns inte.");
        }

        if (household == null)
        {
            return BadRequest("Hushållet finns inte.");
        }

        Console.WriteLine("user.Id: " + user.Id + " household.Id: " + household.Id);
        var existing_profile = _context.Profiles
                .Include(p => p.User)
                .FirstOrDefault(p => p.UserId == user.Id && p.HouseholdId == household.Id);

        if (existing_profile != null)
        {
            return BadRequest("Användaren är redan kopplad till hushållet.");
        }

        var profile = new Profile
        {
            Avatar = dto.Avatar,
            DisplayName = dto.DisplayName,
            HouseholdId = household.Id,
            UserId = user.Id,
            isActive = true,
            isAdmin = dto.IsAdmin,
            isDeleted = false,
        };

        _context.Profiles.Add(profile);
        await _context.SaveChangesAsync();
        return Ok(profile);
    }

}
