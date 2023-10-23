using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class NameChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Households_UserAccounts_OwnerId",
                table: "Households");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Households",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Households_OwnerId",
                table: "Households",
                newName: "IX_Households_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Households_UserAccounts_UserId",
                table: "Households",
                column: "UserId",
                principalTable: "UserAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Households_UserAccounts_UserId",
                table: "Households");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Households",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Households_UserId",
                table: "Households",
                newName: "IX_Households_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Households_UserAccounts_OwnerId",
                table: "Households",
                column: "OwnerId",
                principalTable: "UserAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
