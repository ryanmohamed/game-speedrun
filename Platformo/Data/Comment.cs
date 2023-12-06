using System;
using System.ComponentModel;

namespace Platformo.Data
{
	public class Comment: Entity
	{
		[DefaultValue("null")]
		public String Content { get; set; }
		public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

		public virtual Game Game { get; set; }
    }
}

