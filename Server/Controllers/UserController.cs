using Microsoft.AspNetCore.Mvc;
using DTO;
using User;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<UserAccount>> Get()
    {
        var users = _context.UserAccounts.ToList();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public ActionResult<UserAccount> Get(int id)
    {
        var user = _context.UserAccounts.Find(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPost]
    public ActionResult<UserAccount> Post(UserAccountDto user)
    {
        var newUser = DtoToUser(user);
        _context.UserAccounts.Add(newUser);
        _context.SaveChanges();
        return CreatedAtAction("Get", new { id = newUser.Id }, newUser);
    }

    [HttpPost("login")]
    public IActionResult Login(UserAccountDto loginModel)
    {
        var user = _context.UserAccounts.SingleOrDefault(u => u.Username == loginModel.Username);

        if (user == null || user.Password != loginModel.Password)
        {
            return Unauthorized();
        }

        return Ok(user);
    }

    //ServisMethod
    private UserAccount DtoToUser(UserAccountDto dto)
    {
        return new UserAccount
        {
            Username = dto.Username,
            Password = dto.Password
        };

    }
}