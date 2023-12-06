using System;
using System.ComponentModel;

namespace Platformo.Data
{
	public class Game: Entity
	{
		[DefaultValue("Game")]
		public String Name { get; set; }
		public String Genre { get; set; }

		public virtual List<Comment> Comments { get; set; }
	}
}

