using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
    public ActionResult<UserAccount> Post(UserAccount user)
    {
        _context.UserAccounts.Add(user);
        _context.SaveChanges();
        return CreatedAtAction("Get", new { id = user.Id }, user);
    }
}