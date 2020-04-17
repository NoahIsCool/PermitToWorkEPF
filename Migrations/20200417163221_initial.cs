using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PermitToWorkEpf.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    Notes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentId = table.Column<ulong>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Team = table.Column<string>(nullable: true),
                    Graduation = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentId);
                });

            migrationBuilder.CreateTable(
                name: "SignIns",
                columns: table => new
                {
                    Key = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StudentId = table.Column<ulong>(nullable: true),
                    MachineName = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SignIns", x => x.Key);
                    table.ForeignKey(
                        name: "FK_SignIns_Machines_MachineName",
                        column: x => x.MachineName,
                        principalTable: "Machines",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SignIns_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SignIns_MachineName",
                table: "SignIns",
                column: "MachineName");

            migrationBuilder.CreateIndex(
                name: "IX_SignIns_StudentId",
                table: "SignIns",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SignIns");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
