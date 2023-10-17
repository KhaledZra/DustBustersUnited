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
        var houseHolds = _context.Households.Include("Owner").ToList();
        return Ok(houseHolds);
    }

    [HttpGet("{id}")]
    public ActionResult<Household> Get(int id)
    {
        var houseHold = _context.Households.Include(h => h.Owner).FirstOrDefault(h => h.Id == id);
        if (houseHold == null)
        {
            return NotFound();
        }
        return Ok(houseHold);

    }

    [HttpPost]
    public async Task<ActionResult<Household>> Post(HouseholdDto houseHold)
    {
        var hold = DtoToHousehold(houseHold);
        hold.Confirmation();
        _context.Households.Add(hold);
        await _context.SaveChangesAsync();
        return CreatedAtAction("Get", new { id = hold.Id }, hold);
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