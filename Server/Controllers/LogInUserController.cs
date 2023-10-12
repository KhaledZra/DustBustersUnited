using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using User;

[ApiController]
[Route("api/[controller]")]
public class LogInUserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LogInUserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginModel loginModel)
    {
        var user = _context.UserAccounts.SingleOrDefault(u => u.UserName == loginModel.UserName);

        if (user == null || user.Password != loginModel.Password)
        {
            return Unauthorized();
        }
        
        return Ok("Nu är du inloggad");
    }
}
