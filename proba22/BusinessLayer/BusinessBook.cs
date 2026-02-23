using DataLayer;
using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class BusinessBook : IBusinessBook
    {
        private readonly IBookRepository bookRepository;

        public BusinessBook(IBookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public List<Book> GetBooksWith50()
        {
             return bookRepository.GetAllBooks()
                   .FindAll(item => item.NumberOfPage > 50);
      
        }

        public string InsertBook(Book book)
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(book, null, null);

            if (!Validator.TryValidateObject(book, validationContext, validationResults, true))
            {

                return string.Join(", ", validationResults.Select(vr => vr.ErrorMessage));
   
            }
            if (book != null)
            {
                if (bookRepository.InsertBook(book))
                {
                    return "Uspesno!";
                }
                return "Greska!";
            }
            return "Greska!";
        }
    }
}
