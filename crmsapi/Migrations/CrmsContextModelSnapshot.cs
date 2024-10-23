﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace crmsapi.Migrations
{
    [DbContext(typeof(CrmsContext))]
    partial class CrmsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Arrest", b =>
                {
                    b.Property<int>("ArrestID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ArrestID"));

                    b.Property<DateTime>("ArrestDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ArrestingOfficerID")
                        .HasColumnType("integer");

                    b.Property<string>("Charges")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CriminalID")
                        .HasColumnType("integer");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ArrestID");

                    b.HasIndex("ArrestingOfficerID");

                    b.HasIndex("CriminalID");

                    b.ToTable("Arrests");
                });

            modelBuilder.Entity("Case", b =>
                {
                    b.Property<int>("CaseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CaseID"));

                    b.Property<string>("CaseNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CaseStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CriminalID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("FiledDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("OfficerInChargeID")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CaseID");

                    b.HasIndex("CriminalID");

                    b.HasIndex("OfficerInChargeID");

                    b.ToTable("Cases");
                });

            modelBuilder.Entity("Criminal", b =>
                {
                    b.Property<int>("CriminalID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CriminalID"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CriminalStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("DOB")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("KnownAliases")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Nationality")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhysicalMarks")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CriminalID");

                    b.ToTable("Criminals");
                });

            modelBuilder.Entity("Officer", b =>
                {
                    b.Property<int>("OfficerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("OfficerId"));

                    b.Property<DateTime>("DateJoined")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OfficerName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("OfficerId");

                    b.ToTable("Officers");
                });

            modelBuilder.Entity("Arrest", b =>
                {
                    b.HasOne("Officer", "ArrestingOfficer")
                        .WithMany()
                        .HasForeignKey("ArrestingOfficerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Criminal", "Criminal")
                        .WithMany("Arrests")
                        .HasForeignKey("CriminalID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ArrestingOfficer");

                    b.Navigation("Criminal");
                });

            modelBuilder.Entity("Case", b =>
                {
                    b.HasOne("Criminal", "Criminal")
                        .WithMany("Cases")
                        .HasForeignKey("CriminalID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Officer", "OfficeInCharge")
                        .WithMany("Cases")
                        .HasForeignKey("OfficerInChargeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Criminal");

                    b.Navigation("OfficeInCharge");
                });

            modelBuilder.Entity("Criminal", b =>
                {
                    b.Navigation("Arrests");

                    b.Navigation("Cases");
                });

            modelBuilder.Entity("Officer", b =>
                {
                    b.Navigation("Cases");
                });
#pragma warning restore 612, 618
        }
    }
}
