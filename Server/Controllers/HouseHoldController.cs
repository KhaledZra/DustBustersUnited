using Microsoft.AspNetCore.Mvc;
using DTO;
using Model;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class HouseholdController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HouseholdController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Household>> GetHouseholds()
    {
        var households = _context.Households
            .Include(household => household.Profiles)
            .ToList();

        Console.WriteLine("Code: 200, Ok!");
        return Ok(households);
    }

    [HttpGet("{id}")]
    public ActionResult<Household> Get(int id)
    {
        var household = _context.Households
            .Include(household => household.Chores)
            .Include(household => household.Profiles)
            .FirstOrDefault(h => h.Id == id);
        if (household == null)
        {
            Console.WriteLine("Code: 404, Household not found!");
            return NotFound("Household not found!");
        }
        Console.WriteLine("Code: 200, Ok!");
        return Ok(household);
    }

    //
    // You get the household by code when you join a household
    // Therefore we also need to return the available avatars here
    //
    [HttpGet("ByCode/{code}")]
    public ActionResult<Household> GetByCode(int code)
    {
        var household = _context.Households.FirstOrDefault(h => h.Code == code);
        if (household == null)
        {
            Console.WriteLine("Code: 400, Bad request, household does not exist!");
            return BadRequest("household does not exist!");
        }

        // Todo: Can we refactor this bit to some function?
        // from here --
        var availableAvatars = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8 };
        var usedAvatars = _context.Profiles
            .Where(p => p.HouseholdId == household.Id)
            .Select(p => p.Avatar).ToList();

        availableAvatars = availableAvatars.Except(usedAvatars).ToList();
        if (availableAvatars.Count > 0)
        {
            household.AvailableAvatars = availableAvatars;
        }
        // -- to here

        Console.WriteLine("Code: 200, Ok!");
        return Ok(household);
    }


    [HttpPost]
    public async Task<ActionResult<Household>> Post(HouseholdDto dto)
    {
        var household = new Household(dto);
        _context.Households.Add(household);
        await _context.SaveChangesAsync();
        
        Console.WriteLine("Code: 201, Logged in!");
        return CreatedAtAction("Get", new { id = household.Id }, household);
    }

    [HttpPut("id")]
    public async Task<ActionResult<Household>> Put(int id, Household householddata)
    {
        var household = await _context.Households.FindAsync(id);

        if (household == null)
        {
            return NotFound();
        }
        
        household.Name = householddata.Name;
        _context.Entry(household).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        

        return Ok(household);
    }
    
    // Service method
    public static async Task<bool> ConfirmHouseholdId(int householdId, ApplicationDbContext context)
    {
        var household = await context.Households.FindAsync(householdId);

        return household != null;
    }
}