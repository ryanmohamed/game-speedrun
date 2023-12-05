using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Platformo.Models;

namespace Platformo.Controllers;

public class GameController : Controller
{
    private readonly ILogger<GameController> _logger;

    public GameController(ILogger<GameController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

