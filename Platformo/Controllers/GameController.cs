using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Platformo.Data;
using Platformo.Models;
using Microsoft.EntityFrameworkCore;

namespace Platformo.Controllers;

public class GameController : Controller
{
    private readonly ApplicationContext _db;
    private readonly ILogger<GameController> _logger;

    public GameController(ApplicationContext db, ILogger<GameController> logger)
    {
        _db = db;
        _logger = logger;
    }

    public IActionResult Index()
    {
        // eagerly loaded
        Game samuraiSundown = _db.Games.Include("Comments").First(); // one game for now
        return View(samuraiSundown);
    }
        
    [HttpPost]
    public IActionResult CreateComment ([FromBody] AddCommentModel addComment)
    {
        Game? game = _db.Games.Where(u => u.Id == addComment.GameId).Include("Comments").FirstOrDefault();
        Console.WriteLine(game.Id);
        if (game == null)
        {
            return NotFound();
        }

        game.Comments.Add(new Comment
        { 
            Content = addComment.Comment,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Game = game
        });

        _db.Games.Update(game);
        _db.SaveChanges();

        return Ok();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

