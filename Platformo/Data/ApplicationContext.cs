using System;
using Microsoft.EntityFrameworkCore;

namespace Platformo.Data
{
	public class ApplicationContext: DbContext
	{
		// pass constructor arguments to base class during dependency injection
		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
		
		// tables
		public virtual DbSet<Game> Games { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }

        // override onCreating to seed data
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var samuraiSundown = new Game
            {
                Id = new Guid("b728f6ef-65d8-4da2-8e5f-0f67e3c3401c"),
                Name = "Samurai Sundown",
                Genre = "Action"
            };

            modelBuilder.Entity<Game>().HasData(samuraiSundown);

            // directly make entities in function to avoid abiding by class definition and provide the implicit GameId that was created - directly
            modelBuilder.Entity<Comment>().HasData( 
                new 
                {
                    Id = new Guid("ae426e57-bc6f-4a43-995d-700537dde6ee"),
                    Content = "This game is awesome!",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    GameId = samuraiSundown.Id
                },
                new
                {
                    Id = new Guid("05071fd2-4925-43f5-8246-9d3051b89ebf"),
                    Content = "This game sucks!",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    GameId = samuraiSundown.Id
                }
            );
        }
    }
}

