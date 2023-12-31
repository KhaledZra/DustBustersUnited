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

    [HttpGet("GetChoresByHousehold/{householdId}")]
    public ActionResult<IEnumerable<Chore>> GetChoresByHousehold(int householdId)
    {
        var chores = _context.Chores
            .Where(chore => chore.HouseholdId == householdId)
            .ToList();

        if (chores == null)
        {
            Console.WriteLine($"Code: 404, No chores found for given Id");
            return NotFound();
        }

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

    [HttpPost("SaveChoreMedia/{category}/{choreId}")]
    public async Task<IActionResult> SaveChoreMedia(string category, int choreId)
    {
        var request = HttpContext.Request;
        var file = request.Form.Files[0];
        var fileFormat = Path.GetFileName(request.Form.Files[0].FileName).Split(".")[1];
        var fileName = $"chore-{choreId}." + fileFormat;
        Console.WriteLine("### " + fileName);
        
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload", category, fileName);
        using (var stream = System.IO.File.Create(filePath))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { url = $"https://dustbusters.space/{category}/" + fileName });
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
    public async Task<IActionResult> UpdateChore(Chore incomingChore)
    {
        var currentChore = _context.Chores.FirstOrDefault(chore => chore.Id == incomingChore.Id);

        if (currentChore == null)
        {
            _logger.LogInformation("404: Chore not found");
            return NotFound("Chore not found");
        }

        _context.Entry(currentChore).CurrentValues.SetValues(incomingChore);

        await _context.SaveChangesAsync();

        _logger.LogInformation("Code: 202, Chore is updated!");
        return AcceptedAtAction("GetChore", new { id = incomingChore.Id }, incomingChore);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteChore(int choreId)
    {
        var chore = _context.Chores.Include("ProfileChores")
        .FirstOrDefault(chore => chore.Id == choreId);

        if (chore == null)
        {
            Console.WriteLine("Code: 404, Chore was not found!");
            return NotFound("Chore not found");
        }

        _context.ProfileChores.RemoveRange(chore.ProfileChores);

        _context.Chores.Remove(chore);
        await _context.SaveChangesAsync();

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