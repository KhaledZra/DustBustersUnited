using Microsoft.AspNetCore.Mvc;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChoreController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Chore>> GetChores()
    {
        var chores = _context.Chores.ToList();

        return Ok(chores);
    }

    [HttpGet("{id}")]
    public ActionResult<Chore> GetChore(int choreId)
    {
        var chore = _context.Chores
            .FirstOrDefault(chore => chore.Id == choreId);
        
        return chore == null ? NotFound() : Ok(chore);
    }

    [HttpPost]
    public async Task<ActionResult<Chore>> Post(ChoreDto choreDto)
    {
        var isFound = await HouseholdController.ConfirmHouseholdId(choreDto.HouseholdId, _context);
        if (isFound == false)
        {
            return UnprocessableEntity("Bad householdId");
        }
        
        var chore = DtoToChore(choreDto);
        _context.Chores.Add(chore);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction("GetChore", new { id = chore.Id }, chore);
    }
    
    [HttpPut("ToggleChoreActivity")]
    public IActionResult ToggleChoreActivity(int choreId)
    {
        var chore = _context.Chores.FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null) return NotFound("Chore not found");

        chore.IsActive = !chore.IsActive;
        _context.SaveChanges();
        return AcceptedAtAction("GetChore", new { id = chore.Id }, chore);
    }
    
    [HttpDelete]
    public IActionResult DeleteChore(int choreId)
    {
        var chore = _context.Chores.FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null) return NotFound("Chore not found");

        _context.Chores.Remove(chore);
        _context.SaveChanges();
        return Ok($"ChoreId: {choreId}, was deleted");
    }

    private Chore DtoToChore(ChoreDto dto)
    {
        return new Chore
        {
            Name = dto.Name,
            Description = dto.Description,
            Energy = dto.Energy,
            RepeatInterval = dto.RepeatInterval,
            HouseholdId = dto.HouseholdId,
            
            // Defaults
            IsActive = true,
            Deadline = DateTime.Now.AddDays(dto.RepeatInterval)
        };
    }
    
    // Service Method
    public static async Task<bool> UpdateChoreDeadline(int choreId, ApplicationDbContext context)
    {
        var chore = await context.Chores.FirstOrDefaultAsync((chore) => chore.Id == choreId);

        if (chore == null) return false;

        chore.Deadline = DateTime.Now.AddDays(chore.RepeatInterval);
        await context.SaveChangesAsync();
        return true;
    }
}