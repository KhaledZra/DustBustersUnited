using Microsoft.AspNetCore.Mvc;
using DTO;
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

        Console.WriteLine($"Code: 200, Ok!");
        return Ok(chores);
    }

    [HttpGet("{id}")]
    public ActionResult<Chore> GetChore(int id)
    {
        var chore = _context.Chores
            .FirstOrDefault(h => h.Id == id);
        if (chore == null)
        {
            Console.WriteLine($"Code: 404, Chore not found!");
            return NotFound();
        }
        Console.WriteLine($"Code: 200, Ok!");
        return Ok(chore);
    }

    [HttpPost]
    public async Task<ActionResult<Chore>> Post(ChoreDto choreDto)
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
    
    [HttpPut("ToggleChoreActivity")]
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
            
            // Defaults
            IsActive = true,
            Deadline = DateTime.Now.AddDays(dto.RepeatInterval)
        };
    }
}