using DataLayer.Model;

namespace DataLayer
{
    public interface ICarRepository
    {
        // CREATE
        bool Create(Car car);

        // READ
        List<Car> GetCars();
        Car? GetById(int id);

        // UPDATE
        bool Update(Car car);

        // DELETE
        bool Delete(Car car);
    }
}