using Microsoft.AspNetCore.Mvc;
using Model;
using Microsoft.EntityFrameworkCore;
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

        Console.WriteLine("Code: 200, Ok!");
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
            Console.WriteLine("Code: 404, Profile not found!");
            return NotFound("Profile not found!");
        }

        Console.WriteLine("Code: 200, Ok!");
        return Ok(profile);
    }

    [HttpGet("GetProfilesInHousehold/{householdId}")]
    public ActionResult<IEnumerable<Profile>> GetProfilesInHousehold(int householdId)
    {
        var profiles = _context.Profiles
            .Where(p => p.HouseholdId == householdId)
            .ToList();

        if (profiles.Count == 0)
        {
            Console.WriteLine("Code: 404, No profiles found in the household.");
            return NotFound("No profiles found in the household.");
        }

        Console.WriteLine("Code: 200, Ok!");
        return Ok(profiles);
    }

    [HttpPost("linkToHousehold")]
    public async Task<IActionResult> LinkToHousehold(LinkToHouseholdDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == dto.UserId);
        var household = _context.Households.FirstOrDefault(h => h.Code == dto.Code);

        if (user == null)
        {
            Console.WriteLine("Code: 400, Användaren finns inte.");
            return BadRequest("Användaren finns inte.");
        }

        if (household == null)
        {
            Console.WriteLine("Code: 400, Hushållet finns inte.");
            return BadRequest("Hushållet finns inte.");
        }

        var existing_profile = _context.Profiles
                .Include(p => p.User)
                .FirstOrDefault(p => p.UserId == user.Id && p.HouseholdId == household.Id);

        if (existing_profile != null)
        {
            Console.WriteLine("Code: 400, Användaren är redan kopplad till hushållet.");
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
            isRequest = true
        };

        _context.Profiles.Add(profile);
        await _context.SaveChangesAsync();
        Console.WriteLine("Code: 200, Ok!");
        return Ok(profile);
    }

    [HttpDelete("DeleteHousehold")]
    public IActionResult DeleteHouseholdForUser(DeleteHouseholdDto dto)
    {
        Console.WriteLine("profileId" + dto.ProfileId);
        var profile = _context.Profiles.FirstOrDefault(p => p.Id == dto.ProfileId);

        if (profile != null)
        {
            _context.Profiles.Remove(profile);
            _context.SaveChanges();
            Console.WriteLine("Code: 200, Ok! Hushållet har tagits bort från användaren.");
            return Ok("Hushållet har tagits bort från användaren.");
        }

        Console.WriteLine("Code: 404, Användaren har inte hushåll.");
        return NotFound("Användaren har inte hushåll.");
    }

    [HttpPut("ToggleProfileActive")]
    public IActionResult ToggleProfileActive(int profileId)
    {
        var foundProfile = _context.Profiles.FirstOrDefault(profile => profile.Id == profileId);

        if (foundProfile == null)
        {
            return NotFound("Profile not found");
        }

        foundProfile.isActive = !foundProfile.isActive;
        _context.SaveChanges();
        return Ok(foundProfile);
    }

    [HttpPut("ToggleProfileAdmin")]
    public IActionResult ToggleProfileAdmin(int profileId)
    {
        var foundProfile = _context.Profiles.FirstOrDefault(profile => profile.Id == profileId);

        if (foundProfile == null)
        {
            return NotFound("Profile not found");
        }

        foundProfile.isAdmin = !foundProfile.isAdmin;
        _context.SaveChanges();
        return AcceptedAtAction("GetProfile", new { profileId = profileId }, foundProfile);
    }

    [HttpPut("ToggleProfileRequest")]
    public IActionResult ToggleProfileRequest(int profileId)
    {
        var foundProfile = _context.Profiles.FirstOrDefault(profile => profile.Id == profileId);

        if (foundProfile == null)
        {
            return NotFound("Profile not found");
        }

        foundProfile.isRequest = !foundProfile.isRequest;
        _context.SaveChanges();
        return AcceptedAtAction("GetProfile", new { profileId = profileId }, foundProfile);
    }
}

public class DeleteHouseholdDto
{
    public int ProfileId { get; set; }
}