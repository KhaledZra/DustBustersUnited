using Microsoft.AspNetCore.Mvc;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ChoreController> _logger;

    public ChoreController(ApplicationDbContext context, ILogger<ChoreController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet()]
    public ActionResult<IEnumerable<Chore>> GetChores()
    {
        var chores = _context.Chores.ToList();

        Console.WriteLine($"Code: 200, Ok!");
        return Ok(chores);
    }

    [HttpGet("{id}")]
    public ActionResult<Chore> GetChore(int choreId)
    {
        var chore = _context.Chores
            .FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null)
        {
            Console.WriteLine($"Code: 404, Chore not found!");
            return NotFound();
        }
        Console.WriteLine($"Code: 200, Ok!");
        return Ok(chore);
    }

    [HttpPost]
    public async Task<ActionResult<Chore>> PostChore(ChoreDto choreDto)
    {
        var isFound = await HouseholdController.ConfirmHouseholdId(choreDto.HouseholdId, _context);
        if (isFound == false)
        {
            Console.WriteLine($"Code: 422, Household does not exist!");
            return UnprocessableEntity("Bad householdId");
        }

        var chore = DtoToChore(choreDto);
        _context.Chores.Add(chore);
        await _context.SaveChangesAsync();

        Console.WriteLine($"Code: 201, Chore created!");
        return CreatedAtAction("GetChore", new { id = chore.Id }, chore);
    }

    [HttpPut("ToggleActivity")]
    public IActionResult ToggleChoreActivity(int choreId)
    {
        var chore = _context.Chores.FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null)
        {
            Console.WriteLine($"Code: 404, Chore was not found!");
            return NotFound("Chore not found");
        }

        chore.IsActive = !chore.IsActive;
        _context.SaveChanges();
        Console.WriteLine($"Code: 202, Chore IsActive set to: {chore.IsActive}!");
        return AcceptedAtAction("GetChore", new { id = chore.Id }, chore);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateChore(Chore incomingChore, ILogger<ChoreController> logger)
    {
        var currentChore = _context.Chores.FirstOrDefault(chore => chore.Id == incomingChore.Id);

        if (currentChore == null)
        {
            logger.LogInformation("404: Chore not found");
            return NotFound("Chore not found");
        }

        _context.Entry(currentChore).CurrentValues.SetValues(incomingChore);

        await _context.SaveChangesAsync();

        logger.LogInformation("Code: 202, Chore is updated!");
        return AcceptedAtAction("GetChore", new { id = incomingChore.Id }, incomingChore);
    }

    [HttpDelete]
    public IActionResult DeleteChore(int choreId)
    {
        var chore = _context.Chores.FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null)
        {
            Console.WriteLine("Code: 404, Chore was not found!");
            return NotFound("Chore not found");
        }

        _context.Chores.Remove(chore);
        _context.SaveChanges();
        Console.WriteLine("Code: 200, Chore was deleted!");
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
            ChoreImageBytesString = dto.ChoreImageBytesString,
            ChoreAudioBytesString = dto.ChoreAudioBytesString,

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