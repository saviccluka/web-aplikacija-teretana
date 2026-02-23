using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Naziv knjige je obavezan.")]
        public string? Title { get; set; }
        [Required(ErrorMessage = "Opis knjige je obavezan.")]
        public string? Description { get; set; }
        public int NumberOfPage { get; set; }
    }
}
