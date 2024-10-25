
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ArrestController : ControllerBase
{
    private readonly CrmsContext _context;
    public ArrestController(CrmsContext _context)
    {
        this._context = _context;
    }

    [HttpGet]
    public IActionResult GetAllArrests()
    {
        var allarrests = _context.Arrests.ToList();
        return Ok(allarrests);
    }

    [HttpGet("{id}")]
public IActionResult GetArrestById(int id)
{
    var arrest = _context.Arrests.FirstOrDefault(a => a.ArrestID == id);
    if (arrest == null)
    {
        return NotFound();
    }
    return Ok(arrest); 
}
[HttpGet("Search")]
public IActionResult SearchArrest(string query)
{
    var arrests = _context.Arrests
        .Where(c => c.ArrestID.ToString() == query )
        .ToList();

    if (arrests.Count == 0)
    {
        return NotFound(new { message = "Arrest not found" });
    }

    return Ok(arrests.First());
}
    [HttpPost]
    public IActionResult AddArrest(Arrestdto arrestdto)
    {
        var arrest=new Arrest{
            CriminalID=arrestdto.CriminalID,
            ArrestDate=arrestdto.ArrestDate.ToUniversalTime(),
            Location=arrestdto.Location,
            Charges=arrestdto.Charges,
            ArrestingOfficerID=arrestdto.ArrestingOfficerID,
            Remarks=arrestdto.Remarks
        };
        _context.Arrests.Add(arrest);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllArrests), new { id = arrest.ArrestID, arrest });

    }

    [HttpPut("{id}")]
    public IActionResult UpdateArrests(int id, Arrestdto arrestdto)
    {
        var arrest = _context.Arrests.Find(id);
        if (arrest == null)
        {
            return NotFound();
        }

    
        arrest.ArrestDate = arrestdto.ArrestDate;
        arrest.ArrestingOfficerID = arrestdto.ArrestingOfficerID;
        arrest.Charges= arrestdto.Charges;
        arrest.Location = arrestdto.Location;   
        arrest.CriminalID = arrestdto.CriminalID;
        arrest.Remarks= arrestdto.Remarks;
        _context.Arrests.Update(arrest);
        _context.SaveChanges();
        return Ok(arrestdto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteArrest(int id)
    {
        var arrest =_context.Arrests.Find(id);
        if (arrest == null) return NotFound();
        _context.Arrests.Remove(arrest);
        _context.SaveChanges();
        return Ok(arrest);
    }


    // [HttpGet("criminals-by-case/{caseName}")]
    // public IActionResult GetCriminalsByCaseName(string caseName)
    // {
    //     var casesWithCriminals = _context.Cases
    //     .Include(cr => cr.Criminal)
    //     .Where(c => c.Title == caseName)
    //     .ToList();

    //     if (!casesWithCriminals.Any())
    //     {
    //         return NotFound("No Criminlas found for the given Case Name");
    //     }
    //     return Ok(casesWithCriminals);
    // }
}