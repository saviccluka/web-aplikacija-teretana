using DataLayer.Model;
using System.Data.SqlClient;

namespace DataLayer
{
    public class CarRepository : ICarRepository
    {
        private const string ConnectionString =
            "Data Source=(localdb)\\ProjectModels;Initial Catalog=master;";

        // ================= CREATE =================
        public bool Create(Car car)
        {
            using SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            sqlConnection.Open();

            SqlCommand cmd = sqlConnection.CreateCommand();
            cmd.CommandText =
                @"INSERT INTO Cars (Title, Year, Price)
                  VALUES (@Title,@Year,@Price)";

            cmd.Parameters.AddWithValue("@Title", car.Title);
            cmd.Parameters.AddWithValue("@Year", car.Year);
            cmd.Parameters.AddWithValue("@Price", car.Price);

            return cmd.ExecuteNonQuery() > 0;
        }

        // ================= READ ALL =================
        public List<Car> GetCars()
        {
            List<Car> list = new List<Car>();

            using SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            sqlConnection.Open();

            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "SELECT * FROM Cars";

            SqlDataReader reader = sqlCommand.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Car
                {
                    Id = reader.GetInt32(0),
                    Title = reader.GetString(1),
                    Year = reader.GetInt32(2),
                    Price = reader.GetDecimal(3)
                });
            }

            return list;
        }

        // ================= READ BY ID =================
        public Car? GetById(int id)
        {
            using SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            sqlConnection.Open();

            SqlCommand cmd = sqlConnection.CreateCommand();
            cmd.CommandText = "SELECT * FROM Cars WHERE Id=@Id";
            cmd.Parameters.AddWithValue("@Id", id);

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Car
                {
                    Id = reader.GetInt32(0),
                    Title = reader.GetString(1),
                    Year = reader.GetInt32(2),
                    Price = reader.GetDecimal(3)
                };
            }

            return null;
        }

        // ================= UPDATE =================
        public bool Update(Car car)
        {
            using SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            sqlConnection.Open();

            SqlCommand cmd = sqlConnection.CreateCommand();
            cmd.CommandText =
                @"UPDATE Cars
                  SET Title=@Title,
                      Year=@Year,
                      Price=@Price
                  WHERE Id=@Id";

            cmd.Parameters.AddWithValue("@Id", car.Id);
            cmd.Parameters.AddWithValue("@Title", car.Title);
            cmd.Parameters.AddWithValue("@Year", car.Year);
            cmd.Parameters.AddWithValue("@Price", car.Price);

            return cmd.ExecuteNonQuery() > 0;
        }

        // ================= DELETE =================
        public bool Delete(Car car)
        {
            using SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            sqlConnection.Open();

            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandText = "DELETE FROM Cars WHERE Id=@Id";
            sqlCommand.Parameters.AddWithValue("@Id", car.Id);

            return sqlCommand.ExecuteNonQuery() > 0;
        }
    }
}