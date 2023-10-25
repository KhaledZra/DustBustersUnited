using Microsoft.AspNetCore.Mvc;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

[ApiController]
[Route("api/[controller]")]
public class ChoreProfileController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChoreProfileController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<ProfileChore>> GetProfileChores()
    {
        var profileChores = _context.ProfileChores.ToList();

        return Ok(profileChores);
    }

    [HttpGet("{id}")]
    public ActionResult<ProfileChore> GetProfileChore(int profileChoreId)
    {
        var profileChore = _context.ProfileChores
            .FirstOrDefault(profileChore => profileChore.Id == profileChoreId);
        
        if (profileChore == null)
        {
            return NotFound();
        }
        return Ok(profileChore);
    }

    [HttpPut("TriggerCompletedChoreEvent")]
    public async Task<IActionResult> ToggleChoreActivity(ProfileChoreDto profileChoreDto)
    {
        var chore = await _context.Chores.FirstOrDefaultAsync(chore => chore.Id == profileChoreDto.ChoreId);
        if (chore == null) return NotFound("Chore not found");
        
        var profile = await _context.Profiles.FirstOrDefaultAsync(profile => profile.Id == profileChoreDto.ProfileId);
        if (profile == null) return NotFound("Profile not found");

        var profileChore = DtoToProfileChore(profileChoreDto);
        _context.ProfileChores.Add(profileChore);

        if (!await ChoreController.UpdateChoreDeadline(profileChoreDto.ChoreId, _context))
            return BadRequest("Failed to update ChoreDate");

        await _context.SaveChangesAsync();
        return CreatedAtAction("GetProfileChore", new { id = profileChore.Id }, profileChore);
    }
    
    [HttpDelete]
    public IActionResult DeleteProfileChore(int profileChoreId)
    {
        var profileChore = _context.ProfileChores.FirstOrDefault(profileChore => profileChore.Id == profileChoreId);

        if (profileChore == null) return NotFound("Chore not found");

        _context.ProfileChores.Remove(profileChore);
        _context.SaveChanges();
        return Ok($"ChoreId: {profileChoreId}, was deleted");
    }
    

    private ProfileChore DtoToProfileChore(ProfileChoreDto dto)
    {
        return new ProfileChore
        {
            ProfileId = dto.ProfileId,
            ChoreId = dto.ChoreId,

            // Defaults
            DateCompleted = DateTime.Now,
        };
    }
}