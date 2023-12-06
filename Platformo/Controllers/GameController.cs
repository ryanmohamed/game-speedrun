using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Platformo.Data;
using Platformo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using Platformo.Hubs;

namespace Platformo.Controllers;

public class GameController : Controller
{
    private readonly ApplicationContext _db;
    private readonly IHubContext<CommentHub> _hubContext;
    private readonly ILogger<GameController> _logger;

    public GameController(ApplicationContext db, IHubContext<CommentHub> hubContext, ILogger<GameController> logger)
    {
        _db = db;
        _hubContext = hubContext;
        _logger = logger;
    }

    public IActionResult Index()
    {
        // eagerly loaded
        Game samuraiSundown = _db.Games.Include("Comments").First(); // one game for now
        return View(samuraiSundown);
    }

    public IActionResult GetComments(Guid id)
    {
        Game? game = _db.Games.Where(u => u.Id == id).Include("Comments").FirstOrDefault();
        if (game == null)
        {
            return NotFound();
        }
        return PartialView("_CommentsPartial", game.Comments);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment ([FromBody] AddCommentModel addComment)
    {
        Game? game = await _db.Games.Where(u => u.Id == addComment.GameId).Include("Comments").FirstOrDefaultAsync();
        if (game == null)
        {
            return NotFound();
        }

        Comment newComment = new Comment
        {
            Content = addComment.Comment,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Game = game
        };

        game.Comments.Add(newComment);

        _db.Games.Update(game);
        _db.SaveChanges();
        await _hubContext.Clients.All.SendAsync("Update");

        return Ok();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

