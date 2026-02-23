using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IBusinessBook
    {
        string InsertBook(Book book);
        List<Book> GetBooksWith50();
    }
}
