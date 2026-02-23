using DataLayer;
using DataLayer.Model;

namespace BusinessLayer
{
    public class BusinessCar : IBusinessCar
    {
        private readonly ICarRepository carRepository;

        public BusinessCar(ICarRepository carRepository)
        {
            this.carRepository = carRepository;
        }

        // CREATE
        public string Create(Car car)
        {
            if (carRepository.Create(car))
                return "Automobil dodat";

            return "Greska pri dodavanju";
        }

        // READ ALL
        public List<Car> GetCars()
        {
            var x = from item in carRepository.GetCars()
                    orderby item.Price descending
                    select item;

            return x.ToList();
        }

        // READ BY ID
        public Car? GetById(int id)
        {
            return carRepository.GetById(id);
        }

        // UPDATE
        public string Update(Car car)
        {
            if (carRepository.Update(car))
                return "Automobil izmenjen";

            return "Greska pri izmeni";
        }

        // DELETE
        public string Delete(Car car)
        {
            if (carRepository.Delete(car))
                return "Automobil obrisan";

            return "Greska";
        }
    }
}