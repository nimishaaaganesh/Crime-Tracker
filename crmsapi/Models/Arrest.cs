

public class Arrest
{
    public int ArrestID { get; set; }
    public int CriminalID { get; set; }
    public virtual Criminal Criminal { get; set; }
    public DateTime ArrestDate { get; set; }
    public string Location { get; set; }
    public string Charges { get; set; }
    public int ArrestingOfficerID { get; set; }
   
    public virtual Officer ArrestingOfficer {get; set;}
    public string Remarks { get; set; }
}


