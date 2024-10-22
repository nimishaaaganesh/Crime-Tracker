
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class OfficersController : ControllerBase
{
    private readonly CrmsContext _context;
    public OfficersController(CrmsContext _context)
    {
        this._context = _context;
    }

    [HttpGet]
    public IActionResult GetAllOfficers()
    {
        var allusers = _context.Officers.ToList();
        return Ok(allusers);
    }
    [HttpGet("{id}")]
public IActionResult GetOfficerById(int id)
{
    var officer = _context.Officers.FirstOrDefault(c => c.OfficerId == id);
    if (officer == null)
    {
        return NotFound();
    }
    return Ok(officer); 
}

    [HttpPost]
    public IActionResult AddOfficers(Officerdto officerdto)
    {
        var officer = new Officer
        {
            OfficerName = officerdto.OfficerName,
            PasswordHash = officerdto.PasswordHash,
            Email = officerdto.Email,
            FirstName = officerdto.FirstName,
            LastName = officerdto.LastName,
            Role = officerdto.Role,
            Phone = officerdto.Phone,
            DateJoined = officerdto.DateJoined.ToUniversalTime()
        };
        _context.Officers.Add(officer);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllOfficers), new { id = officer.OfficerId }, officer);

    }

    [HttpPut("{id}")]
    public IActionResult UpdatedOfficers(int id, Officerdto officerdto)
    {
        var officer = _context.Officers.Find(id);
        if (officer == null)
        {
            return NotFound();
        }
        officer.OfficerName = officerdto.OfficerName;
        officer.FirstName = officerdto.FirstName;
        officer.LastName = officerdto.LastName;
        officer.Email = officerdto.Email;
        officer.Phone = officerdto.Phone;
        officer.PasswordHash = officerdto.PasswordHash;
        officer.Role = officerdto.Role;
        officer.DateJoined = officerdto.DateJoined;
        _context.Officers.Update(officer);
        _context.SaveChanges();
        return Ok(officerdto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletaOfficer(int id)
    {
        var officer = _context.Officers.Find(id);
        if (officer == null) return NotFound();
        _context.Officers.Remove(officer);
        _context.SaveChanges();
        return NoContent();
    }
    [HttpGet("Search")]
    public IActionResult SearchOfficer(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { message = "Query cannot be empty" });
        }

        var officers = _context.Officers
            .Where(o => o.OfficerId.ToString() == query ||
                         o.FirstName.ToLower().Contains(query.ToLower()))
            .ToList();

        if (!officers.Any()) 
        {
            return NotFound(new { message = "Officer not found" });
        }

        return Ok(officers);
    }


}