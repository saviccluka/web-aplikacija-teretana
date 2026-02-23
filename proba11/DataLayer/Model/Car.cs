using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Car
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
    }
}
