public class Case
{
    public int CaseID { get; set; }
    public string CaseNumber { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime FiledDate { get; set; }
    public string CaseStatus { get; set; } 
    public int OfficerInChargeID { get; set; }
    public virtual Officer OfficeInCharge{ get; set; }
    public int CriminalID { get; set; }
    public virtual Criminal Criminal { get; set; }
}