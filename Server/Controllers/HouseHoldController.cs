using Microsoft.AspNetCore.Mvc;
using DTO;
using Model;
using Microsoft.EntityFrameworkCore;

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

        return Ok(households);
    }

    [HttpGet("{id}")]
    public ActionResult<Household> Get(int id)
    {
        var household = _context.Households
            .FirstOrDefault(h => h.Id == id);
        if (household == null)
        {
            return NotFound();
        }
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
        if (household == null) return NotFound();

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

        return Ok(household);
    }


    [HttpPost]
    public async Task<ActionResult<Household>> Post(HouseholdDto householdDto)
    {
        var household = DtoToHousehold(householdDto);
        household.Confirmation();
        _context.Households.Add(household);
        await _context.SaveChangesAsync();
        return CreatedAtAction("Get", new { id = household.Id }, household);
    }

    private Household DtoToHousehold(HouseholdDto dto)
    {
        return new Household
        {
            Name = dto.Name,
            UserId = dto.OwnerId
        };
    }
}