using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Platformo.Migrations
{
    /// <inheritdoc />
    public partial class SeedComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Content", "CreatedAt", "GameId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("05071fd2-4925-43f5-8246-9d3051b89ebf"), "This game sucks!", new DateTime(2023, 12, 5, 14, 29, 39, 550, DateTimeKind.Local).AddTicks(2330), new Guid("b728f6ef-65d8-4da2-8e5f-0f67e3c3401c"), new DateTime(2023, 12, 5, 14, 29, 39, 550, DateTimeKind.Local).AddTicks(2330) },
                    { new Guid("ae426e57-bc6f-4a43-995d-700537dde6ee"), "This game is awesome!", new DateTime(2023, 12, 5, 14, 29, 39, 550, DateTimeKind.Local).AddTicks(2270), new Guid("b728f6ef-65d8-4da2-8e5f-0f67e3c3401c"), new DateTime(2023, 12, 5, 14, 29, 39, 550, DateTimeKind.Local).AddTicks(2320) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: new Guid("05071fd2-4925-43f5-8246-9d3051b89ebf"));

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: new Guid("ae426e57-bc6f-4a43-995d-700537dde6ee"));
        }
    }
}
