
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class CaseController : ControllerBase
{
    private readonly CrmsContext _context;
    public CaseController(CrmsContext _context)
    {
        this._context = _context;
    }

    [HttpGet]
    public IActionResult GetAllCases()
    {
        var allcases = _context.Cases.ToList();
        return Ok(allcases);
    }

        [HttpGet("{id}")]
public IActionResult GetCaseById(int id)
{
    var cases = _context.Cases.FirstOrDefault(c => c.CaseID == id);
    if (cases == null)
    {
        return NotFound();
    }
    return Ok(cases); 
}
[HttpGet("Search")]
public IActionResult SearchCase(string query)
{
    var cases = _context.Cases
        .Where(c => c.CaseID.ToString() == query )
        .ToList();

    if (cases.Count == 0)
    {
        return NotFound(new { message = "Case not found" });
    }

    return Ok(cases.First());
}

    [HttpPost]
    public IActionResult AddCase(Casedto casesdto)
    {
        var cases=new Case{
            CaseNumber=casesdto.CaseNumber,
            Title=casesdto.Title,
            Description=casesdto.Description,
            FiledDate=casesdto.FiledDate.ToUniversalTime(),
            CaseStatus=casesdto.CaseStatus,
            OfficerInChargeID=casesdto.OfficerInChargeID,
            CriminalID=casesdto.CriminalID
        };
        _context.Cases.Add(cases);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllCases), new { id = cases.CaseID, cases });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateArrests(int id, Casedto casedto)
    {
        var cases = _context.Cases.Find(id);
        if (cases == null)
        {
            return NotFound();
        }

        
        cases.Title = casedto.Title;
        cases.Description = casedto.Description;
        cases.CaseNumber= casedto.CaseNumber;
        cases.FiledDate= casedto.FiledDate;
        cases.CaseStatus= casedto.CaseStatus;
        cases.OfficerInChargeID= casedto.OfficerInChargeID;
        cases.CriminalID= casedto.CriminalID;


        
        _context.Cases.Update(cases);
        _context.SaveChanges();
        return Ok(casedto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCases(int id)
    {
        var cases =_context.Cases.Find(id);
        if (cases == null) return NotFound();
        _context.Cases.Remove(cases);
        _context.SaveChanges();
        return NoContent();
    }
}