using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace crmsapi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Criminals",
                columns: table => new
                {
                    CriminalID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Gender = table.Column<string>(type: "text", nullable: false),
                    DOB = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Nationality = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    PhysicalMarks = table.Column<string>(type: "text", nullable: false),
                    KnownAliases = table.Column<string>(type: "text", nullable: false),
                    CriminalStatus = table.Column<string>(type: "text", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Criminals", x => x.CriminalID);
                });

            migrationBuilder.CreateTable(
                name: "Officers",
                columns: table => new
                {
                    OfficerId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OfficerName = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    DateJoined = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Officers", x => x.OfficerId);
                });

            migrationBuilder.CreateTable(
                name: "Arrests",
                columns: table => new
                {
                    ArrestID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CriminalID = table.Column<int>(type: "integer", nullable: false),
                    ArrestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Charges = table.Column<string>(type: "text", nullable: false),
                    ArrestingOfficerID = table.Column<int>(type: "integer", nullable: false),
                    Remarks = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arrests", x => x.ArrestID);
                    table.ForeignKey(
                        name: "FK_Arrests_Criminals_CriminalID",
                        column: x => x.CriminalID,
                        principalTable: "Criminals",
                        principalColumn: "CriminalID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Arrests_Officers_ArrestingOfficerID",
                        column: x => x.ArrestingOfficerID,
                        principalTable: "Officers",
                        principalColumn: "OfficerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    CaseID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CaseNumber = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    FiledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CaseStatus = table.Column<string>(type: "text", nullable: false),
                    OfficerInChargeID = table.Column<int>(type: "integer", nullable: false),
                    CriminalID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.CaseID);
                    table.ForeignKey(
                        name: "FK_Cases_Criminals_CriminalID",
                        column: x => x.CriminalID,
                        principalTable: "Criminals",
                        principalColumn: "CriminalID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cases_Officers_OfficerInChargeID",
                        column: x => x.OfficerInChargeID,
                        principalTable: "Officers",
                        principalColumn: "OfficerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arrests_ArrestingOfficerID",
                table: "Arrests",
                column: "ArrestingOfficerID");

            migrationBuilder.CreateIndex(
                name: "IX_Arrests_CriminalID",
                table: "Arrests",
                column: "CriminalID");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_CriminalID",
                table: "Cases",
                column: "CriminalID");

            migrationBuilder.CreateIndex(
                name: "IX_Cases_OfficerInChargeID",
                table: "Cases",
                column: "OfficerInChargeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Arrests");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "Criminals");

            migrationBuilder.DropTable(
                name: "Officers");
        }
    }
}
