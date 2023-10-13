using Microsoft.AspNetCore.Mvc;
using DTO;
using User;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class HouseHoldController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HouseHoldController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<HouseHold>> GetAllHouseHold()
    {
        var houseHolds = _context.HouseHolds.Include("Owner").ToList();
        return Ok(houseHolds);
    }

    [HttpGet("{id}")]
    public ActionResult<HouseHold> Get(int id)
    {
        var houseHold = _context.HouseHolds.Include(h => h.Owner).FirstOrDefault(h => h.Id == id);
        if (houseHold == null)
        {
            return NotFound();
        }
        return Ok(houseHold);

    }

    [HttpPost]
    public async Task<ActionResult<HouseHold>> Post(HouseHoldDto houseHold)
    {
        var hold = DtoToHouseHold(houseHold);
        hold.Confirmation();
        _context.HouseHolds.Add(hold);
        await _context.SaveChangesAsync();
        return CreatedAtAction("Get", new { id = hold.Id }, hold);
    }

    private HouseHold DtoToHouseHold(HouseHoldDto dto)
    {
        return new HouseHold
        {
            Name = dto.Name,
            OwnerId = dto.OwnerId
        };
    }
}