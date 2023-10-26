using Microsoft.AspNetCore.Mvc;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

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
    public ActionResult<IEnumerable<User>> Get()
    {
        var users = _context.Users
            .Include(user => user.Households)
            // .ThenInclude(household => household.Profiles) // risky, endpoint probably needs refacturing
            .ToList();

        Console.WriteLine("Code: 200, Ok!");
        return Ok(users);
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null)
        {
            Console.WriteLine("Code: 404, User not found!");
            return NotFound("User not found!");
        }
        Console.WriteLine("Code: 200, Ok!");
        return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> Post(UserAccountDto user)
    {
        var newUser = DtoToUser(user);
        _context.Users.Add(newUser);
        _context.SaveChanges();
        
        Console.WriteLine("Code: 201, Created new user!");
        return CreatedAtAction("Get", new { id = newUser.Id }, newUser);
    }

    [HttpPost("login")]
    public IActionResult Login(UserAccountDto loginModel)
    {
        var user = _context.Users.SingleOrDefault(u => u.Username == loginModel.Username);

        if (user == null || user.Password != loginModel.Password)
        {
            Console.WriteLine("Code: 401, Unauthorized!");
            return Unauthorized();
        }

        Console.WriteLine("Code: 200, Logged in!");
        return Ok(user);
    }

    //ServisMethod
    private User DtoToUser(UserAccountDto dto)
    {
        return new User
        {
            Username = dto.Username,
            Password = dto.Password
        };

    }
}