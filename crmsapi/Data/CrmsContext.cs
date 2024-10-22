using Microsoft.EntityFrameworkCore;
public class CrmsContext : DbContext
{
    public CrmsContext(DbContextOptions<CrmsContext> options) : base(options)
    {

    }

    public DbSet<Officer> Officers { get; set;}
    public DbSet<Criminal> Criminals{ get; set;}
    public DbSet<Case> Cases{ get; set;}
    public DbSet<Arrest> Arrests{ get; set;}


protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Officer>()
    .HasKey(u=>u.OfficerId);
    modelBuilder.Entity<Criminal>()
    .HasKey(cr=>cr.CriminalID);
    modelBuilder.Entity<Case>() 
    .HasKey(c=>c.CaseID);
    modelBuilder.Entity<Arrest>()
    .HasKey(a=>a.ArrestID);

     modelBuilder.Entity<Criminal>()
        .Property(c => c.DOB)
        .HasColumnType("timestamp with time zone");

    modelBuilder.Entity<Criminal>()
        .Property(c => c.DateAdded)
        .HasColumnType("timestamp with time zone");

    modelBuilder.Entity<Case>()
    .Property(c=>c.FiledDate)
    .HasColumnType("timestamp with time zone");
     
     modelBuilder.Entity<Arrest>()
    .Property(a=>a.ArrestDate)
    .HasColumnType("timestamp with time zone");

 modelBuilder.Entity<Officer>()
    .Property(o=>o.DateJoined)
    .HasColumnType("timestamp with time zone");

    modelBuilder.Entity<Case>()
    .HasOne<Officer>(c=>c.OfficeInCharge)
    .WithMany(u=>u.Cases)
    .HasForeignKey(c=>c.OfficerInChargeID);

    modelBuilder.Entity<Case>()
    .HasOne<Criminal>(c=>c.Criminal)
    .WithMany(cr=>cr.Cases)
    .HasForeignKey(c=>c.CriminalID);

    modelBuilder.Entity<Arrest>()
    .HasOne<Officer>(a=>a.ArrestingOfficer)
    .WithMany()
    .HasForeignKey(a=>a.ArrestingOfficerID);

    modelBuilder.Entity<Arrest>()
    .HasOne<Criminal>(a=>a.Criminal)
    .WithMany(cr=>cr.Arrests)
    .HasForeignKey(a=>a.CriminalID);

    
}
}