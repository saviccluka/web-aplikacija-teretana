using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class BookRepository : IBookRepository
    {
        private const string ConnectionString = "Data Source=(localdb)\\ProjectModels;Initial Catalog=\"LibraryDB \";";

        [Obsolete]
        public List<Book> GetAllBooks()
        {
            List<Book> list = new List<Book>();
            using(SqlConnection sqlConnection = new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "SELECT * FROM Books";
                SqlDataReader reader = sqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    Book book = new Book();
                    book.Id = reader.GetInt32(0);
                    book.Title = reader.GetString(1);
                    book.Description = reader.GetString(2);
                    book.NumberOfPage = reader.GetInt32(3);
                    list.Add(book);
                }
            }
            return list;
        }

        [Obsolete]
        public bool InsertBook(Book book)
        {
            using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "INSERT INTO Books(Title,Description,NumberOfPages) VALUES(@Title,@Description,@NumberOfPages)";
                sqlCommand.Parameters.AddWithValue("@Title", book.Title);
                sqlCommand.Parameters.AddWithValue("@Description", book.Description);
                sqlCommand.Parameters.AddWithValue("@NumberOfPages", book.NumberOfPage);
                int result = sqlCommand.ExecuteNonQuery();
                return result > 0;
            }
        }
    }
}
