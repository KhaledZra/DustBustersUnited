using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class IncludeChores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Chores_HouseholdId",
                table: "Chores",
                column: "HouseholdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chores_Households_HouseholdId",
                table: "Chores",
                column: "HouseholdId",
                principalTable: "Households",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chores_Households_HouseholdId",
                table: "Chores");

            migrationBuilder.DropIndex(
                name: "IX_Chores_HouseholdId",
                table: "Chores");
        }
    }
}
