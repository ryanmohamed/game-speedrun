using System;
namespace Platformo.Models
{
	public class AddCommentModel
	{
		public Guid GameId { get; set; }
		public String Comment { get; set; }
	}
}

