using DataLayer.Model;

namespace BusinessLayer
{
    public interface IBusinessCar
    {
        List<Car> GetCars();

        string Create(Car car);
        string Update(Car car);
        string Delete(Car car);

        Car? GetById(int id);
    }
}