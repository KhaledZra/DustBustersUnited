using Microsoft.AspNetCore.Mvc;
using DTO;
using User;
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
    public ActionResult<IEnumerable<Household>> GetAllHousehold()
    {
        var households = _context.Households.Include("Owner").ToList();
        return Ok(households);
    }

    [HttpGet("{id}")]
    public ActionResult<Household> Get(int id)
    {
        var household = _context.Households.Include(h => h.Owner).FirstOrDefault(h => h.Id == id);
        if (household == null)
        {
            return NotFound();
        }
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
            OwnerId = dto.OwnerId
        };
    }
}