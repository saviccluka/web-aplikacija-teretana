using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DataLayer
{
    public class CarRepository : ICarRepository
    {
        private const string ConnectionString = "Data Source=(localdb)\\ProjectModels;Initial Catalog=CarDB; ";
        public bool Delete(Car car)
        {
            using(SqlConnection sqlConnection=new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "DELETE FROM Cars WHERE Id=@Id";
                sqlCommand.Parameters.AddWithValue("@Id", car.Id);
                return sqlCommand.ExecuteNonQuery() > 0;

            }
        }

        public List<Car> GetCars()
        {
            List<Car> list = new List<Car>();
            using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                SqlCommand sqlCommand = sqlConnection.CreateCommand();
                sqlCommand.CommandText = "SELECT * FROM Cars";
               
               SqlDataReader reader = sqlCommand.ExecuteReader();   
                while (reader.Read())
                {
                    Car car = new Car();
                    car.Id = reader.GetInt32(0);
                    car.Title = reader.GetString(1);
                    car.Year = reader.GetInt32(2);
                    car.Price = reader.GetDecimal(3);
                    list.Add(car);
                }

            }
            return list;
        }
    }
}
