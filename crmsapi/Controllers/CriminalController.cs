
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CriminalController : ControllerBase
{
    private readonly CrmsContext _context;
    public CriminalController(CrmsContext _context)
    {
        this._context = _context;
    }

    [HttpGet]
    public IActionResult GetAllCriminals()
    {
        var allcriminals = _context.Criminals.ToList();
        return Ok(allcriminals);
    }


[HttpGet("{id}")]
public IActionResult GetCriminalById(int id)
{
    var criminal = _context.Criminals.FirstOrDefault(c => c.CriminalID == id);
    if (criminal == null)
    {
        return NotFound();
    }
    return Ok(criminal); 
}

[HttpGet("Search")]
public IActionResult SearchCriminal(string query)
{
    var criminals = _context.Criminals
        .Where(c => c.CriminalID.ToString() == query || c.FirstName.ToLower().Contains(query.ToLower()))
        .ToList();

    if (criminals.Count == 0)
    {
        return NotFound(new { message = "Criminal not found" });
    }

    return Ok(criminals.First());
}



    [HttpPost]
    public IActionResult AddCriminals(Criminaldto criminaldto)
    {
        var criminal= new Criminal{
            FirstName = criminaldto.FirstName,
            LastName=criminaldto.LastName,
            Gender=criminaldto.Gender,
            DOB=criminaldto.DOB.ToUniversalTime(),
            Nationality=criminaldto.Nationality,
            Address=criminaldto.Address,
            Phone=criminaldto.Phone,
            PhysicalMarks=criminaldto.PhysicalMarks,
            KnownAliases=criminaldto.KnownAliases,
            DateAdded=criminaldto.DateAdded.ToUniversalTime(),
            CriminalStatus=criminaldto.CriminalStatus,
        };
        _context.Criminals.Add(criminal);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllCriminals), new { id = criminal.CriminalID, criminal });

    }

    [HttpPut("{id}")]
    public IActionResult UpdateCriminals(int id, Criminaldto criminaldto)
    {
        var criminal = _context.Criminals.Find(id);
        if (criminal == null)
        {
            return NotFound();
        }

        criminal.FirstName = criminaldto.FirstName;
        criminal.LastName = criminaldto.LastName;
        criminal.Gender = criminaldto.Gender;
        criminal.Phone = criminaldto.Phone;
        criminal.DOB = criminaldto.DOB;
        criminal.Nationality = criminaldto.Nationality;
        criminal.CriminalStatus = criminaldto.CriminalStatus;
        criminal.Address = criminaldto.Address;
        criminal.KnownAliases = criminaldto.KnownAliases;
        criminal.DateAdded = criminaldto.DateAdded;
        criminal.PhysicalMarks = criminaldto.PhysicalMarks;
        _context.Criminals.Update(criminal);
        _context.SaveChanges();
        return Ok(criminaldto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCriminal(int id)
    {
        var criminal =_context.Criminals.Find(id);
        if (criminal == null) return NotFound();
        _context.Criminals.Remove(criminal);
        _context.SaveChanges();
        return NoContent();
    }


    [HttpGet("criminals-by-case/{caseName}")]
    public IActionResult GetCriminalsByCaseName(string caseName)
    {
        var casesWithCriminals = _context.Cases
        .Include(cr => cr.Criminal)
        .Where(c => c.Title == caseName)
        .ToList();

        if (!casesWithCriminals.Any())
        {
            return NotFound("No Criminlas found for the given Case Name");
        }
        return Ok(casesWithCriminals);
    }
}