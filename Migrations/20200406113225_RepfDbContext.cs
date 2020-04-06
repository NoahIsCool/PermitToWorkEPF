using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PermitToWorkEpf.Migrations
{
    public partial class RepfDbContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SignIns_Students_StudentId1",
                table: "SignIns");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SignIns",
                table: "SignIns");

            migrationBuilder.DropIndex(
                name: "IX_SignIns_StudentId1",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "time",
                table: "SignIns");

            migrationBuilder.RenameColumn(
                name: "notes",
                table: "Machines",
                newName: "Notes");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Machines",
                newName: "Name");

            migrationBuilder.AlterColumn<ulong>(
                name: "StudentId",
                table: "SignIns",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "Key",
                table: "SignIns",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "SignIns",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "MachineName",
                table: "SignIns",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "SignIns",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SignIns",
                table: "SignIns",
                column: "Key");

            migrationBuilder.CreateIndex(
                name: "IX_SignIns_MachineName",
                table: "SignIns",
                column: "MachineName");

            migrationBuilder.CreateIndex(
                name: "IX_SignIns_StudentId",
                table: "SignIns",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_SignIns_Machines_MachineName",
                table: "SignIns",
                column: "MachineName",
                principalTable: "Machines",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SignIns_Students_StudentId",
                table: "SignIns",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SignIns_Machines_MachineName",
                table: "SignIns");

            migrationBuilder.DropForeignKey(
                name: "FK_SignIns_Students_StudentId",
                table: "SignIns");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SignIns",
                table: "SignIns");

            migrationBuilder.DropIndex(
                name: "IX_SignIns_MachineName",
                table: "SignIns");

            migrationBuilder.DropIndex(
                name: "IX_SignIns_StudentId",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "Key",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "MachineName",
                table: "SignIns");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "SignIns");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Machines",
                newName: "notes");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Machines",
                newName: "name");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "SignIns",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(ulong),
                oldNullable: true)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<ulong>(
                name: "StudentId1",
                table: "SignIns",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "time",
                table: "SignIns",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SignIns",
                table: "SignIns",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_SignIns_StudentId1",
                table: "SignIns",
                column: "StudentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SignIns_Students_StudentId1",
                table: "SignIns",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
