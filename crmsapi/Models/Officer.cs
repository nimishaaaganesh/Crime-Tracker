public class Officer
{
    public int OfficerId { get; set; }
    public string OfficerName { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Role { get; set; } 
    public string Phone { get; set; }
    public DateTime DateJoined { get; set; }
    
     public virtual ICollection<Case>? Cases { get; set; }
}

